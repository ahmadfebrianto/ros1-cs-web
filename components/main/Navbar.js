app.component('navbar', {
  template:
    /*HTML*/
    `
    <nav class="container-fluid navbar shadow gx-4 py-2 ml-auto">
      <button type="button" id="sidebarCollapse" class="btn" style="color: white; background-color: #17a2b8; border-color: #17a2b8;">
        <i class="fas fa-align-left"></i>
        <span> Toggle Sidebar</span>
      </button>
      <div 
        class="col-auto ml-auto rounded-pill" style="padding: 7px 20px;"
        :class="this.$store.state.status === 'Connected' ? 'bg-success' : 'bg-danger'">
        <small class="text-white">{{ this.$store.state.status }}</small>
      </div>
    </nav>
    `,

  data() {
    return {
      timestamp: '',
    };
  },

  methods: {
    getNow() {
      const today = new Date();
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.timestamp = dateTime;
    },
  },

  created() {
    setInterval(this.getNow, 1000);
  },
});
