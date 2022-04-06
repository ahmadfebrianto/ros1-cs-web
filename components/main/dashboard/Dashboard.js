app.component('dashboard', {
  template: `
    <div class="row flex-nowrap mt-2 gx-0">
      <div class="col-sm px-2">
        <navigation-mode />
      </div>

      <div class="col-md">
        <dashboard-map />
      </div>

      <div class="col-sm px-2">
        <Transition mode="out-in">
          <joystick v-if="this.$store.state.navigationMode === 'Joystick'"/>
          <interactive v-else/>
        </Transition>
        
      </div>
    </div>
    `,

  data() {
    return {};
  },

  methods: {
    init() {
      // Connect to ROS.
      var ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090',
      });

      ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        console.log('Connected to websocket server.');
      });

      ros.on('close', () => {
        this.$store.commit('setStatus', 'Disconnected');
        console.log('Connection to websocket server closed.');
      });

      ros.on('error', (error) => {
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
        ros: ros,
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
