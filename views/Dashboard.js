app.component('dashboard', {
  template: `
    <div class="row flex-nowrap mt-2 gx-0">
      <div id="dashboard-left" class="col-sm">
        <navigation-mode />
        <speed />
      </div>

      <div id="dashboard-center" class="col-md">
        <dashboard-map />
      </div>

      <div id="dashboard-right" class="col-sm">
        <Transition mode="out-in">
          <joystick v-if="this.$store.state.navigationMode === 'Joystick'" :ros="ros" />
          <interactive v-else/>
        </Transition>
        
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
        divID: 'nav',
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
