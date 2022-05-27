app.component('navgoal', {
  template:
    /* HTML */
    `
      <div class="card">
        <div class="flex flex-2 sm:flex-col md:flex-row gap-2 p-2">
          <button
            class="button bg-red-500 hover:opacity-90 active:opacity-100"
            @click="cancelGoal"
            :class="connectionClass"
          >
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
    },
  },

  computed: {
    robotConnected() {
      return this.$store.state.robotConnected;
    },

    navClient() {
      return this.$store.state.navigatorClient;
    },

    connectionClass() {
      return {
        // Disable 'Cancel Goal' button if robot is not connected
        'pointer-events-none opacity-50': !this.robotConnected,
      };
    },
  },
});
