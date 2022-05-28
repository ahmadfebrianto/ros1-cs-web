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

        <div class="sm:col-span-2 md:basis-1/4">
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
      /*
       * There is a strange behaviour in this app. When we reconnect to the robot after jumping
       * from Dashboard to another page a couple of times, the map will render multiple canvasses
       * depending on how many times we leave the dashboard page. In order to leave only one canvas,
       * the others must be removed in this lifecycle hook.
       */
      this.removeCanvasses();
    });
  },
});
