window.onbeforeunload = () => {
  console.log('unloading');
};

const app = Vue.createApp({
  template: /*html*/ `
    
    <div id="app">
      <div class="row flex-nowrap">
        <sidebar />

        <div id="content" class="col gx-0">
          <navbar />
          <main class="container">
            <router-view />
          </main>
        </div>
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
    } else {
      this.$store.commit('setActiveMenu', 'Dashboard');
      this.$store.commit('setNavigationMode', 'Interactive');
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
