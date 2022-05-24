app.component('connection', {
  template: `
        <div id="connection" class="card">
            <div class="mb-1">
                <small class="text-gray-700 font-bold tracking-wider">Connection</small>
            </div> 
            <div class="flex flex-3 gap-x-1 sm:flex-col md:flex-row">
                <div class="basis-2/3">
                    <input 
                      class="input text-center tracking-widest focus:outline-none" 
                      type="text" 
                      v-model="ip" 
                      placeholder="IP">
                </div>
                <div class="basis-1/3">
                    <input 
                      class="input text-center tracking-wider focus:outline-none" 
                      type="text" 
                      v-model="port" 
                      placeholder="Port">
                </div>
            </div>
            <div>
                <div class="flex mt-1">
                  <button 
                    v-if="this.$store.state.status === 'Disconnected'" 
                    class="button bg-blue-primary hover:opacity-90" 
                    @click="connect">
                    Connect
                  </button>
                  <button v-else 
                    class="button bg-red-500 hover:opacity-90"
                    @click="disconnect">
                    Disconnect
                  </button>
                </div>
            </div>
        </div>

    `,

  data() {
    return {
      ros: null,
      ip: 'localhost',
      port: '9090',
    };
  },

  methods: {
    connect() {
      if (this.ip === '' || this.port === '') {
        this.sendLog('IP or port is empty', 'error');
        return;
      }

      const connection = {
        ip: this.ip,
        port: this.port,
      };

      const options = {
        url: `ws://${connection.ip}:${connection.port}`,
      };

      this.ros = new ROSLIB.Ros(options);

      this.ros.on('connection', () => {
        this.$store.commit('setStatus', 'Connected');
        this.sendLog(
          `Connected to ${connection.ip} on port ${connection.port}`,
          'success'
        );
        this.$store.commit('setRos', this.ros);
        emitter.emit('connected');
      });

      this.ros.on('error', (error) => {
        this.sendLog('Error connecting to websocket server.', 'error');
      });

      this.$store.commit('setConnection', connection);
    },

    disconnect() {
      if (this.ros !== null) {
        this.ros.close();
        this.ros = null;
        this.$store.commit('setRos', this.ros);
      }
      this.$store.commit('setConnection', null); 
      this.$store.commit('setStatus', 'Disconnected');
      this.sendLog(`Connection closed`, 'error');
      emitter.emit('disconnected');
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
  } 
});
