app.component('dashboard', {
  template:
    /* HTML */
    `
      <div
        class="mt-3 
                md:flex flex-row md:gap-3 
                sm:grid sm:grid-rows-3 sm:grid-cols-3 sm:gap-x-3"
      >
        <div class="sm:row-span-3 sm:col-span-1 md:basis-1/4">
          <connection />
          <navigation-mode />
          <speed v-if="modeJoystick"/>
          <joystick v-if="modeJoystick" />
          <navgoal v-else />
        </div>

        <div class="sm:col-span-2 sm:row-span-2 md:basis-2/4">
          <dashboard-map />
        </div>

        <div class="sm:hidden md:block md:basis-1/4">
          <pose />
          <log />
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

  computed: {
    modeJoystick() {
      return this.$store.state.navigationMode === 'Joystick';
    },
  },

  methods: {
    removeCanvasses() {
      const map = document.getElementById('map');
      let canvasses = map.getElementsByTagName('canvas');
      while (canvasses.length > 1) {
        map.removeChild(canvasses[0]);
      }
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  mounted() {
    emitter.on('mapLoaded', () => {
      this.removeCanvasses();
    });
  },
});
