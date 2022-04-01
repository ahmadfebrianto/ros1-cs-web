app.component('dashboard', {
  template: `

      <div id="nav" class="">
      </div>

    `,

  methods: {
    init() {
      // Connect to ROS.
      var ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090',
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
