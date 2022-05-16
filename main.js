const app = Vue.createApp({
  template: /*html*/ `
    <div class="flex h-screen">
      <sidebar ref="sidebar" />
      <div id="content" ref="content" class="flex-initial w-full">
        <navbar />
        <main>
          <router-view />
        </main>
      </div>
    </div>
 

  `,
  data() {
    return {};
  },

  methods: {
    handler: function handler(event) {
      this.$store.commit('setRefreshed', true);
      if (
        this.$refs.sidebar.$el.clientWidth !== this.$store.state.sidebarWidth
      ) {
        this.$store.commit(
          'setSidebarWidth',
          this.$refs.sidebar.$el.clientWidth
        );
      }
      localStorage.setItem('state', JSON.stringify(this.$store.state));
    },

    getSidebarWidth() {
      return this.$store.state.sidebarWidth;
    },

    updateSidebarAndContentMargin() {
      const sidebarWidth = this.getSidebarWidth();
      this.$refs.content.style.marginLeft = `${sidebarWidth}px`;
    },

    setSidebarCollapsed() {
      this.$store.commit(
        'setSidebarCollapsed',
        !this.$store.state.sidebarCollapsed
      );
    },
  },

  created() {
    window.addEventListener('beforeunload', this.handler);
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handler);
  },

  mounted() {
    if (localStorage.getItem('state') !== null) {
      this.$store.replaceState(JSON.parse(localStorage.getItem('state')));
      localStorage.clear();
    }

    emitter.on('sidebarWidthUpdated', () => {
      this.updateSidebarAndContentMargin();
    });

    emitter.on('sidebarToggled', () => {
      this.$store.commit(
        'setSidebarCollapsed',
        !this.$store.state.sidebarCollapsed
      );
    });
  },
});

const emitter = mitt();
