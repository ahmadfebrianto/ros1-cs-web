app.component('dashboard-map', {
  template:
    /*HTML*/
    `    
    <div class="card">
        <div 
          id="map" 
          class="h-500 flex justify-center items-center bg-gray-100"
          :class="disableClickOnJoystickMode()"
        >
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
      emitter.emit('ensureOneCanvas');
    }
  },
});
