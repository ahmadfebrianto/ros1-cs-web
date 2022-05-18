app.component('dashboard', {
  template: `
    <div class="mt-3 grid grid-cols-4 grid-flow-col gap-5">
      <div id="" class="">
        <connection />
        <navigation-mode />
        <speed />
      </div>

      <div id="" class="col-span-2">
        <dashboard-map />
      </div>

      <div id="" class="">
        <joystick v-if="this.$store.state.navigationMode === 'Joystick'" :ros="ros" />
        <interactive v-else/>
      </div>
    </div>
    `,

  data() {
    return {
      ros: null,
      viewer: null,
      nav: null,
    };
  },

  methods: {
    connect(options) {
      // Connect to ROS.
      if (this.ros === null) {
        this.ros = new ROSLIB.Ros(options);
      }
      this.ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        console.log('Connected to websocket server.');
        // this.initNav(this.viewer);
      });
      this.ros.on('close', () => {
        this.$store.commit('setStatus', 'Disconnected');
        console.log('Connection to websocket server closed.');
      });
      this.ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error.message);
      });

      var viewer = new ROS2D.Viewer({
        divID: 'map',
        width: 500,
        height: 500,
      });

      var nav = NAV2D.OccupancyGridClientNav({
        ros: this.ros,
        rootObject: viewer.scene,
        viewer: viewer,
        serverName: '/move_base',
      });
    },

    disconnect() {
      if (this.ros !== null) {
        this.ros.close();
        this.ros = null;
      }
      this.$store.commit('setStatus', 'Disconnected');
    },

    removeCanvas() {
      const map = document.getElementById('map');
      map.removeChild(map.lastElementChild);
    },
  },

  mounted() {
    emitter.on('connect', () => {
      const connection = this.$store.state.connection;
      const options = {
        url: `ws://${connection.ip}:${connection.port}`,
      };
      this.connect(options);
    });

    emitter.on('disconnect', () => {
      this.disconnect();
      this.removeCanvas();
    });
  },
});
