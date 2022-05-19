app.component('connection', {
  template: `
        <div id="connection" class="card">
            <div class="mb-1">
                <small class="font-bold">Connection</small>
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
                    class="button bg-blue-primary text-slate-100 hover:opacity-90" 
                    @click="connect">
                    Connect
                  </button>
                  <button v-else 
                    class="button bg-red-500 text-slate-100 hover:opacity-90""
                    @click="disconnect">
                    Disconnect
                  </button>
                </div>
            </div>
        </div>

    `,

  data() {
    return {
      ip: 'localhost',
      port: '9090',
    };
  },

  methods: {
    connect() {
      if (this.ip === '' || this.port === '') {
        console.log('IP or port is empty');
        return;
      }

      this.$store.commit('setConnection', { ip: this.ip, port: this.port });
      emitter.emit('connect');
      console.log(`Connecting to ${this.ip}:${this.port}`)
    },

    disconnect() {
      this.$store.commit('setConnection', null);
      emitter.emit('disconnect');
      console.log('Disconnecting');
    },
  },
});
