app.component('log', {
  template: `
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
                    :class="log.color">
                    {{ log.text }}
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

      if (this.logs.length > 5) {
        this.logs.shift();
      }

      console.log(this.logs);
    },

    saveLogs() {
      // Save logs to localStorage
      localStorage.setItem('logs', JSON.stringify(this.logs));
    },

    loadLogs() {
      // Load logs from localStorage
      if (localStorage.getItem('logs')) {
        this.logs = JSON.parse(localStorage.getItem('logs'));
        localStorage.removeItem('logs');
      }
    },
  },

  mounted() {
    emitter.on('addLog', this.insertLog);
    this.loadLogs();
  },

  watch: {
    $route(to, from) {
      this.saveLogs();
    },
  },
});
