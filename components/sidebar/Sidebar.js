app.component('sidebar', {
  template:
    /*html*/
    `
<<<<<<< HEAD
    <nav id="sidebar" class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-blue-primary">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <div class="w-100 text-center py-10 sidebar-logo">
            AGV
            </div>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                id="menu">

                <li
                  @click="this.$store.commit('setActiveMenu', item.name )"
                  :class="this.$store.state.activeMenu === item.name ? 'active-menu' : ''" 
                  class="nav-item menu-item" 
                  v-for="item in items">
                    <sidebar-item :item="item" />
                </li>
            </ul>
            <hr>
        </div>
=======
    <nav id="sidebar">
      <div class="sidebar-header">
        <h4><b>Automatic Guided Vehicle</b></h4>
      </div>

      <ul class="list-unstyled components">
        <li class="nav-item" v-for="item in items">
          <sidebar-item :item="item" />
        </li>
      </ul>
      
>>>>>>> testing
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



{/* <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-5 d-none d-sm-inline">AGV</span>
            </a> */}
