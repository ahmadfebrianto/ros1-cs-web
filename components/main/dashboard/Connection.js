app.component('connection', {
  template: `
        <div class="card">
            <div class="mb-1 tracking-wide">
                <small class="font-bold">Connection</small>
            </div> 
            <div class="flex sm:flex-col lg:flex-row gap-1">
                <div class="basis-2/3">
                    <input class="input pl-4 tracking-widest" type="text" v-model="ip" placeholder="IP">
                </div>
                <div class="basis-1/3">
                    <input class="input text-center tracking-wide" type="text" v-model="port" placeholder="Port">
                </div>
            </div>
            <div class="mt-1">
                <div class="flex ">
                  <button 
                    v-if="this.$store.state.status === 'Disconnected'" 
                    class="button bg-blue-primary text-white-primary font-bold"
                    @click="connect">
                      Connect
                  </button>
                  <button 
                    v-else class="button bg-red-500 text-white-primary font-bold" 
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
