app.component('interactive', {
  template: `
    <div class="card">
        <div class="flex flex-2 sm:flex-col md:flex-row gap-2 p-2">
            <button class="button bg-red-500 hover:opacity-90 active:opacity-100"
                @click="cancelGoal"
                :class="{ 'pointer-events-none opacity-50': !connected }">
                Cancel Goal
            </button>
        </div>
    </div>
    `,
  methods: {
    cancelGoal() {
      this.navClient.navigator.cancelGoal();
      this.sendLog('Goal canceled', 'info');
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    }
  },

  computed: {
    connected() {
      return this.$store.state.status === 'Connected';
    },

    navClient() {
      return this.$store.state.navigatorClient;
    }
  },
});
