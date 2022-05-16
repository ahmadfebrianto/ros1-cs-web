app.component('sidebar', {
  template:
    /*html*/
    `
    <aside 
      id="sidebar" 
      class=""
      :class="this.$store.state.sidebarCollapsed ? 'collapsed' : ''"
    >
        <div 
          id="sidebar-header"
          class="bg-gray-300 h-32 grid content-center"
        >
          <img v-if="isSidebarCollapsed()" class="sidebar-logo" src="assets/images/sidebar/header/s.png">
          <img v-else class="sidebar-logo" src="assets/images/sidebar/header/logo.png"> 
        </div>
        <ul class="mt-10 px-2">
          <li 
            class="sidebar-menu" 
            :class="setActiveMenuColor(item.name)"
            @click="setActiveMenu(item.name)"
            v-for="item in items"
          >
            <sidebar-item :item="item"/>
          </li>
        </ul>
        
    </aside>
      `,

  methods: {
    isSidebarCollapsed() {
      return this.$store.state.sidebarCollapsed;
    },

    setActiveMenu(route) {
      this.$store.commit('setActiveMenu', route);
    },

    setActiveMenuColor(route) {
      if (this.$store.state.activeMenu === route) {
        return 'sidebar-menu-active';
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

  data() {
    return {
      items: [
        {
          name: 'Dashboard',
          svg: 'assets/images/sidebar/grid-fill.svg',
          route: '/',
        },
        {
          name: 'Settings',
          svg: 'assets/images/sidebar/gear-fill.svg',
          route: '/settings',
        },
        {
          name: 'Documentation',
          svg: 'assets/images/sidebar/bookmarks-fill.svg',
          route: '/documentation',
        },
        {
          name: 'About',
          svg: 'assets/images/sidebar/info-circle-fill.svg',
          route: '/about',
        },
      ],
    };
  },

  mounted() {},

  updated() {
    this.updateSidebarWidth();
  },
});
