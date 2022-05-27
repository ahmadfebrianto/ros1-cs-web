app.component('dashboard-map', {
  template:
    /* HTML */
    ` <div class="card p-2">
      <div
        id="map"
        class="flex justify-center items-center
                sm:h-auto md:h-500"
        :class="navigationModeClass"
      >
        <img v-if="!robotConnected" src="assets/images/map/agv.png" />
      </div>
    </div>`,

  data() {
    return {
      nav: null,
    };
  },

  methods: {
    renderMap() {
      var viewer = new ROS2D.Viewer({
        divID: 'map',
        width: 500,
        height: 500,
      });

      this.navClient = new NAV2D.OccupancyGridClientNav({
        ros: this.ros,
        rootObject: viewer.scene,
        viewer: viewer,
        serverName: '/move_base',
        // markerImage: 'assets/icons/app/agv-marker.png',
        withOrientation: true,
      });

      var path = new ROS2D.PathShape({
        strokeSize: 1,
        strokeColor: createjs.Graphics.getRGB(255, 0, 0, 0.66),
      });

      this.navClient.rootObject.addChild(path);  

      var topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/move_base/NavfnROS/plan',
        messageType: 'nav_msgs/Path',
      });

      topic.subscribe(function (message) {
        if (
          message !== null &&
          typeof message !== 'undefined' &&
          typeof message.poses !== 'undefined' &&
          message.poses.length > 0
        ) {
          path.setPath(message);
        }
      });

      this.$store.commit('setNavigatorClient', this.navClient);
      emitter.emit('mapLoaded');
    },

    removeCanvas() {
      if (!this.robotConnected) {
        var map = document.getElementById('map');
        var canvas = map.getElementsByTagName('canvas');
        while (canvas.length > 0) {
          map.removeChild(canvas[0]);
        }
      }
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  computed: {
    ros() {
      return this.$store.state.ros;
    },

    robotConnected() {
      return this.$store.state.robotConnected;
    },

    navigationModeClass() {
      return {
        // When navigation mode is set to Joystick, disable click on map
        'pointer-events-none': this.$store.state.navigationMode === 'Joystick',
        // When the robot is connected, remove background color on map
        'bg-gray-100': !this.$store.state.robotConnected,
      };
    },
  },

  mounted() {
    /*
     * Handle the event when robot is connected
     * by rendering the map
     */
    emitter.on('connected', () => {
      this.renderMap();
    });

    /*
     * When we move (from the Dashboard) to another page (e.g. About) while robot is connected
     * and then return to the Dashboard, all components in the Dashboard are remounted
     * including 'map' component. That causes the 'map' canvas to be removed.
     * Since the robotConnected state is true, the placeholder image is not shown as well.
     * This leaves the map component empty. To fix this, we have to re-render the map when
     * the robot is connected because ros instance is still available in the store.
     */
    if (this.robotConnected) {
      this.renderMap();
    }
  },

  updated() {
    /*
     * When the robot is disconnected, remove the map canvas. Otherwise, it will overlap
     * the placeholder image. 
     */
    this.removeCanvas();
  },
});
