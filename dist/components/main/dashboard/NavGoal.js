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
    /* 
     * Kirimkan event ke map, kemudian map akan mengirim goal
     */
    sendGoal() {
      emitter.emit('sendGoal', this.pose);
    },

    /* 
     * Batalkan goal yang sedang dikirimkan ke robot
     */
    cancelGoal() {
      this.navClient.navigator.cancelGoal();
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  computed: {
    /* 
     * Menentukan apakah goal telah ditetapkan di map, namun belum dikirim
     */
    goalSet() {
      return this.$store.state.goalSet;
    },

    /* 
     * Menentukan apakah goal telah dikirimkan ke robot
     */
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
        /* 
         * Disable tombol 'Send Goal' saat goal belum ditetapkan
         */
        'pointer-events-none opacity-50': !this.goalSet,
      };
    },

    goalSentClass() {
      return {
        /* 
         * Disable tombol 'Cancel Goal' saat goal belum dikirimkan
         */
        'pointer-events-none opacity-50': !this.goalSent,
      };
    },
  },

  mounted() {
    /* 
     * Proses event yang dikirimkan dari Nav2d
     */
    emitter.on('goalSet', (pose) => {
      this.$store.commit('setGoalSet', true);
      this.pose = pose;
    });

    /* 
     * Event saat disconnect dan goal masih aktif
     */
    emitter.on('cancelGoal', () => {
      this.cancelGoal();
      this.$store.commit('setGoalSent', false);
    });
  },
});
