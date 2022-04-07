app.component('sidebar', {
  template:
    /*html*/
    `
    <nav id="sidebar" class="col-auto col-md-3 col-xl-2 bg-blue-primary min-vh-100">
        <div class="sidebar-header">
           <img id="logo" src="assets/images/sidebar/logo.png"> 
        </div>
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                id="menu">

                <li
                  @click="this.$store.commit('setActiveMenu', item.name )"
                  :class="this.$store.state.activeMenu === item.name ? 'active-menu' : ''" 
                  class="nav-item menu-item w-100" 
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

