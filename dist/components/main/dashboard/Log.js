app.component('log', {
  template:
    /* HTML */
    `
      <div class="card">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider">Logs</small>
        </div>

        <div class="input p-3">
          <p
            v-if="rosLogs.length > 0"
            v-for="(log, index) in rosLogs"
            :key="index"
            class="text-xxs"
            :class="log.color"
          >
            <small :class="highlightNewLog(index)">-</small> {{ log.text }}
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
    insertLog(log) {
      let _log = { text: log.text };
      if (log.category === 'success') {
        _log.color = 'text-log-success';
      } else if (log.category === 'info') {
        _log.color = 'text-log-info';
      } else {
        _log.color = 'text-log-error';
      }
      this.logs.push(_log);

      // Remove old logs if more than 5
      if (this.logs.length > 5) {
        this.logs.shift();
      }
    },

    saveLogs() {
      localStorage.setItem('logs', JSON.stringify(this.logs));
    },

    /*
     * Upon visiting other pages (e.g. About), the logs will be cleared so it must be saved
     * to localStorage in advance. When the user returns to the dashboard, the logs will then
     * loaded from localStorage.
     */
    loadLogs() {
      if (localStorage.getItem('logs')) {
        this.logs = JSON.parse(localStorage.getItem('logs'));
        localStorage.removeItem('logs');
      }
    },

    // Make the last log text bold
    highlightNewLog(index) {
      if (index === this.logs.length - 1) {
        return 'text-blue-primary font-bold';
      } else {
        return 'text-gray-400'
      }
    },
  },

  mounted() {
    emitter.on('addLog', this.insertLog);
    this.loadLogs();
  },

  watch: {
    // Watch router activity, i.e. when the user leaves the dashboard page
    $route(to, from) {
      this.saveLogs();
    },
  },
});
