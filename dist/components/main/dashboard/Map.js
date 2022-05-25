app.component('dashboard-map', {
  template:
    /*HTML*/
    `    
    <div class="card">
        <div 
          id="map" 
          class="flex justify-center items-center bg-gray-100
                sm:h-auto md:h-500"
          :class="disableClickOnJoystickMode()">
          <img v-if="!isConnected()" src="assets/images/map/agv.png"> 
        </div>
    </div>`,

  data() {
    return {
      nav: null,
    };
  },

  methods: {
    isConnected() {
      return this.$store.state.status === 'Connected';
    },

    disableClickOnJoystickMode() {
      return this.$store.state.navigationMode === 'Joystick'
        ? 'pointer-events-none'
        : '';
    },

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

      emitter.emit('mapLoaded');
      this.$store.commit('setNavigatorClient', this.navClient);
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
  },

  mounted() {
    emitter.on('connected', () => {
      console.log('on map: captured connected event');
      this.renderMap();
    });

    if (this.isConnected()) {
      this.renderMap();
    }
  },

  updated() {
    if (this.isConnected()) {
      const map = document.getElementById('map');
      let canvasses = map.getElementsByTagName('canvas');
      while (canvasses.length > 1) {
        map.removeChild(canvasses[0]);
      }
    }
  },
});
