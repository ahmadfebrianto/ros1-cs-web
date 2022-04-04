app.component('navbar', {
  template:
    /*HTML*/
    `
    <nav class="container-fluid navbar shadow gx-4 py-2">
        <div class="row">
            <div 
                class="col-auto ml-auto rounded-pill" 
                :class="this.$store.state.status === 'Connected' ? 'bg-success' : 'bg-danger'">
                <small class="text-white">{{ this.$store.state.status }}</small>
            </div>
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
