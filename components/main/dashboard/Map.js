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
    return {};
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
