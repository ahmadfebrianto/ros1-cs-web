app.component('log', {
  template:
    /* HTML */
    `
      <div class="card">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider">Logs</small>
        </div>

        <div class="input p-3">
          <table v-if="rosLogs.length > 0">
            <tr
              v-for="(log, index) in rosLogs"
              :key="index"
              class="text-xxs"
              :class="log.color"
            >
              <td :class="highlightNewLog(index)" class="align-top">-</td>
              <td>{{ log.text }}</td>
            </tr>
          </table>
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

    /* 
     * Simpan log ke local storage
     */
    saveLogs() {
      localStorage.setItem('logs', JSON.stringify(this.logs));
    },

    /* 
     * Muat log yang tersimpan di local storage 
     */
    loadLogs() {
      if (localStorage.getItem('logs')) {
        this.logs = JSON.parse(localStorage.getItem('logs'));
        localStorage.removeItem('logs');
      }
    },

    /* 
     * Kurangi opacity log yang lama agar bida membedakan log yang baru
     */
    highlightNewLog(index) {
      if (index === this.logs.length - 1) {
        return 'opacity-100';
      } else {
        return 'opacity-30';
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
