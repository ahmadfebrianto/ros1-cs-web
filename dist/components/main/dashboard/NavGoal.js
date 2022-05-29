app.component('navgoal', {
  template:
    /* HTML */
    `
      <div class="card">
        <div class="flex flex-2 sm:flex-col md:flex-row gap-2 p-2">
          <button
            class="button bg-blue-primary hover:opacity-90 active:opacity-100"
            @click="sendGoal"
            :class="goalSetClass"
          >
            Send Goal
          </button>
          <button
            class="button bg-red-500 hover:opacity-90 active:opacity-100"
            @click="cancelGoal"
            :class="goalSentClass"
          >
            Cancel Goal
          </button>
        </div>
      </div>
    `,
  data() {
    return {
      pose: null,
    };
  },

  methods: {
    sendGoal() {
      emitter.emit('sendGoal', this.pose);
      console.log(this.pose);
    },

    cancelGoal() {
      this.navClient.navigator.cancelGoal();
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  computed: {
    goalSet() {
      return this.$store.state.goalSet;
    },

    goalSent() {
      return this.$store.state.goalSent;
    },

    robotConnected() {
      return this.$store.state.robotConnected;
    },

    navClient() {
      return this.$store.state.navigatorClient;
    },

    goalSetClass() {
      return {
        // Disable 'Cancel Goal' button if robot is not connected
        'pointer-events-none opacity-50': !this.goalSet,
      };
    },

    goalSentClass() {
      return {
        // Disable 'Cancel Goal' button if robot is not connected
        'pointer-events-none opacity-50': !this.goalSent,
      };
    },
  },

  mounted() {
    emitter.on('goalSet', (pose) => {
      this.$store.commit('setGoalSet', true);
      this.pose = pose;
    })
  }
});
