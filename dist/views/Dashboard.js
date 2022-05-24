app.component('dashboard', {
  template: `
  <div class="mt-3 
            md:flex flex-row md:gap-3 
            sm:grid sm:grid-rows-3 sm:grid-cols-3 sm:gap-x-3">
    <div class="sm:row-span-3 sm:col-span-1 md:basis-1/4">
      <connection />
      <navigation-mode />
      <speed />
      <joystick v-if="this.$store.state.navigationMode === 'Joystick'"/>
      <interactive v-else/>
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

  methods: {
    removeCanvas() {
      const map = document.getElementById('map');
      map.removeChild(map.lastElementChild);
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  mounted() {
    emitter.on('disconnected', () => {
      this.removeCanvas();
    });

    emitter.on('mapLoaded', () => {
      const map = document.getElementById('map');
      let canvasses = map.getElementsByTagName('canvas');
      while (canvasses.length > 1) {
        map.removeChild(canvasses[0]);
      }
    });
  },
});
