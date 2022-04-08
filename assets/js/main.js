const app = Vue.createApp({
  template: /*html*/ `
    
    <div class="row flex-nowrap">
      <sidebar />
      <div id="content" class="col gx-0">
        <navbar />
        <main class="">
          <router-view />
        </main>
      </div>
    </div>

  `,
  data() {
    return {};
  },

  created() {
    window.addEventListener('beforeunload', this.handler);
  },

  mounted() {
    if (localStorage.getItem('state') !== null) {
      this.$store.replaceState(JSON.parse(localStorage.getItem('state')));
      localStorage.clear()
    } 
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handler);
  },

  methods: {
    handler: function handler(event) {
      localStorage.setItem('state', JSON.stringify(this.$store.state));
    },
  },
});


const emitter = mitt();
