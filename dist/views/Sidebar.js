app.component('sidebar', {
  template:
    /* HTML */
    `
      <aside
        id="sidebar"
        class="bg-blue-primary max-w-1/5 h-full 
            sm:hidden md:hidden 
            lg:block fixed top-0 left-0 bottom-0"
      >
        <div class="bg-gray-secondary h-32 grid content-center">
          <img
            v-if="sidebarCollapsed"
            class="m-auto"
            src="assets/icons/app/32x32.png"
          />
          <img
            v-else
            class="m-auto p-12"
            src="assets/icons/sidebar/header/logo.png"
          />
        </div>
        <ul class="mt-10 px-2">
          <li
            class="text-white-primary rounded-lg mt-1
                  hover:bg-blue-secondary"
            :class="setActiveMenuColor(item.name)"
            @click="setActiveMenu(item.name)"
            v-for="item in items"
          >
            <sidebar-item :item="item" />
          </li>
        </ul>
      </aside>
    `,

  data() {
    return {
      items: [
        {
          name: 'Dashboard',
          svg: 'assets/icons/sidebar/grid-fill.svg',
          route: '/',
        },
        {
          name: 'About',
          svg: 'assets/icons/sidebar/info-circle-fill.svg',
          route: '/about',
        },
      ],
    };
  },

  computed: {
    sidebarCollapsed() {
      return this.$store.state.sidebarCollapsed;
    },
  },

  methods: {
    setActiveMenu(route) {
      this.$store.commit('setActiveMenu', route);
    },

    setActiveMenuColor(route) {
      if (this.$store.state.activeMenu === route) {
        return 'bg-blue-tertiary pointer-events-none';
      }
    },

    getSidebarWidth() {
      return this.$store.state.sidebarWidth;
    },

    updateSidebarWidth() {
      if (this.$store.state.refreshed) {
        this.$store.commit('setRefreshed', false);
        this.$store.commit('setSidebarWidth', this.$store.state.sidebarWidth);
      } else {
        this.$store.commit('setSidebarWidth', this.$el.clientWidth);
      }
      emitter.emit('sidebarWidthUpdated');
    },
  },

  updated() {
    this.updateSidebarWidth();
  },
});
