app.component('dashboard', {
  template: `
    <div class="mt-3 
              md:flex flex-row gap-4
              sm:grid sm:grid-rows-3 sm:grid-cols-3">
      <div class="sm:row-span-2 sm:col-span-1 md:basis-1/4">
        <connection />
        <navigation-mode />
        <speed />
      </div>

      <div class="sm:col-span-2 sm:row-span-3 md:basis-2/4">
        <dashboard-map />
      </div>

      <div class="basis-1/4">
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
    connect() {
      const connection = this.$store.state.connection;
      const options = {
        url: `ws://${connection.ip}:${connection.port}`,
      };
      this.ros = new ROSLIB.Ros(options);
      this.ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        console.log('Connected to websocket server.');
        this.renderMap();
      });

      this.ros.on('close', () => {
        console.log('Connection to websocket server closed.');
      });

      this.ros.on('error', (error) => {
        console.log('Error connecting to websocket server.');
      });
    },

    renderMap() {
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

      emitter.emit('mapLoaded');
    },

    disconnect() {
      if (this.ros !== null) {
        this.ros.close();
        this.ros = null;
      }
      this.$store.commit('setStatus', 'Disconnected');
    },

    removeCanvasses() {
      const map = document.getElementById('map');
      let canvasses = map.getElementsByTagName('canvas');
      if (canvasses.length > 0) {
        map.removeChild(canvasses[0]);
      }
    },

    ensureOneCanvas() {
      const map = document.getElementById('map');
      let canvasses = map.getElementsByTagName('canvas');
      while (canvasses.length > 1) {
        map.removeChild(canvasses[0]);
      }
    },
  },

  mounted() {
    if (this.$store.state.status === 'Connected') {
      this.disconnect();
      this.connect();
    }

    emitter.on('connect', () => {
      this.connect();
    });

    emitter.on('disconnect', () => {
      this.disconnect();
      this.removeCanvasses();
    });

    emitter.on('mapLoaded', () => {
      this.ensureOneCanvas();
    });

    emitter.on('ensureOneCanvas', () => {
      this.ensureOneCanvas();
    });
  },
});
