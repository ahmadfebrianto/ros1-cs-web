const app = Vue.createApp({
  template: /*html*/ `
    <div class="flex h-screen">
      <sidebar ref="sidebar" />
      <div 
        ref="content" 
        class="flex-initial w-full bg-white-secondary py-2 px-4 ml-primary">
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
    refreshHandler(event) {
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

    resizeHandler(event) {
      let newSidebarSize = this.$refs.sidebar.$el.clientWidth;
      if (newSidebarSize === 0) {
        this.$store.commit('setSidebarHidden', true);
      } else {
        this.$store.commit('setSidebarHidden', false);
      }
      this.$store.commit('setSidebarWidth', newSidebarSize);
      this.updateSidebarAndContentMargin();
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

    disableContextMenu(event) {
      event.preventDefault();
      return false;
    },
  },

  created() {
    window.addEventListener('beforeunload', this.refreshHandler);
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('contextmenu', this.disableContextMenu);
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handler);
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('contextmenu', this.disableContextMenu);
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

const emitter = new EventEmitter2();
