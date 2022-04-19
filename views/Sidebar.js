app.component('sidebar', {
  template:
    /*html*/
    `
    <nav 
      id="sidebar" 
      class="col-auto bg-blue-primary min-vh-100"
      :class="this.$store.state.sidebarCollapsed ? 'collapsed' : 'col-sm-2 col-md-2'"
      >
        <div 
          class="sidebar-header"
          :class="{ 'p-5' : !this.$store.state.sidebarCollapsed }">
          <h1 v-if="this.$store.state.sidebarCollapsed">S</h1>
          <img v-else id="sidebar-header-logo" src="assets/images/sidebar/logo.png"> 
        </div>
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 text-white">
            <ul class="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100">
                <li
                  @click="this.$store.commit('setActiveMenu', item.name )"
                  :class="this.$store.state.activeMenu === item.name ? 'active-menu' : ''" 
                  class="sidebar-menu-item w-100" 
                  v-for="item in items">
                    <sidebar-item :item="item" />
                </li>
            </ul>
            <hr>
        </div>
    </nav>
      `,

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
});