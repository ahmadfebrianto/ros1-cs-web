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
    connect() {
      const connection = this.$store.state.connection;
      const options = {
        url: `ws://${connection.ip}:${connection.port}`,
      };

      this.ros = new ROSLIB.Ros(options);
      this.ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        this.sendLog(
          `Connected to ${connection.ip}:${connection.port}`,
          'success'
        );
        this.$store.commit('setRos', this.ros);
        emitter.emit('connected');
      });

      this.ros.on('error', (error) => {
        this.sendLog('Error connecting to websocket server.', 'error');
      });
    },

    disconnect() {
      if (this.ros !== null) {
        this.ros.close();
        this.ros = null;
      }
      this.$store.commit('setStatus', 'Disconnected');
      this.sendLog(`Connection closed`, 'error');
    },

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
    if (this.$store.state.status === 'Connected') {
      this.disconnect();
      this.connect();
    }

    emitter.on('connect', () => {
      this.connect();
    });

    emitter.on('disconnect', () => {
      this.disconnect();
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
