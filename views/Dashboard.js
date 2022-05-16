app.component('dashboard', {
  template: `
    <div class="mt-5 grid grid-cols-4 grid-flow-col gap-5">
      <div id="" class="">
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
    };
  },

  methods: {
    init() {
      // Connect to ROS.
      if (this.ros === null) {
        this.ros = new ROSLIB.Ros({
          url: 'ws://localhost:9090',
        });
      }

      this.ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        console.log('Connected to websocket server.');
      });

      this.ros.on('close', () => {
        this.$store.commit('setStatus', 'Disconnected');
        console.log('Connection to websocket server closed.');
      });

      this.ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error.message);
      });

      // Create the main viewer.
      var viewer = new ROS2D.Viewer({
        divID: 'map',
        width: 500,
        height: 500,
      });

      // Setup the nav client.
      var nav = NAV2D.OccupancyGridClientNav({
        ros: this.ros,
        rootObject: viewer.scene,
        viewer: viewer,
        serverName: '/move_base',
      });
    },
  },

  mounted() {
    this.init();
  },
});
