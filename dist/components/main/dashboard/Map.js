app.component('dashboard-map', {
  template:
    /*HTML*/
    `    
    <div class="card">
        <div 
          id="map" 
          class="flex justify-center items-center bg-gray-100
                sm:h-auto md:h-500"
          :class="navigationModeClass">
          <img v-if="!robotConnected" src="assets/images/map/agv.png"> 
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

      this.$store.commit('setNavigatorClient', this.navClient);
      emitter.emit('mapLoaded');
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
        'pointer-events-none': this.$store.state.navigationMode === 'Joystick',
      }
    }

  },

  mounted() {
    emitter.on('connected', () => {
      this.renderMap();
    });

    if (this.robotConnected) {
      this.renderMap();
    }
  },
});
