app.component('connection', {
  template: `
        <div id="connection" class="card">
            <div class="mb-2">
                <small class="font-bold">Connection</small>
            </div> 
            <div class="grid grid-cols-3 gap-1">
                <div class="col-span-2">
                    <input class="input pl-4 tracking-widest" type="text" v-model="ip" placeholder="IP">
                </div>
                <div class="col-span-1">
                    <input class="input text-center tracking-wide" type="text" v-model="port" placeholder="Port">
                </div>
            </div>
            <div>
                <div class="flex">
                  <button v-if="this.$store.state.status === 'Disconnected'" class="button bg-blue-primary text-slate-100" @click="connect">Connect</button>
                  <button v-else class="button bg-red-500 text-slate-100" @click="disconnect">Disconnect</button>
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
