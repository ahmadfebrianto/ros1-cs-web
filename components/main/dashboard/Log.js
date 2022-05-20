app.component('log', {
  template: `
        <div class="card">
            <div class="mb-1">
                <small class="text-gray-700 font-bold tracking-wider">Log</small>
            </div>

            <div class="input p-3">
                <p 
                    v-if="rosLogs.length > 0" 
                    v-for="(log, index) in rosLogs" 
                    :key="index" 
                    class="text-xxs">
                    {{ log }}
                </p>
                <p v-else class="text-xxs">No logs</p>
            </div>
        </div>
    `,
  data() {
    return {
      logs: [],
    };
  },

  computed: {
    rosLogs() {
      return this.logs;
    },
  },

  methods: {
    insertLog(text) {
      this.logs.push(text);
    },

    clearLogs() {
      this.logs = [];
    },

    removeLog(log) {
      this.logs.splice(this.logs.indexOf(log), 1);
    },
  },

  mounted() {
    emitter.on('insertLog', this.insertLog);
  },

  watch: {
    logs: {
      handler(newValue) {
        if (newValue.length > 5) {
          this.removeLog(newValue[0]);
        }
      },
    },
  },
});
