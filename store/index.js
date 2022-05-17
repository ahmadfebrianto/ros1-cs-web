const store = Vuex.createStore({
  state: {
    status: 'Disconnected', // Connected, Disconnected
    navigationMode: 'Interactive', // Joystick or Interactive
    activeMenu: 'Dashboard', // 'Dashboard', 'Settings', 'Documentation', 'About'
    robotSpeed: 0.1, // m/s
    robotDirection: 'forward', // forward, backward, left, right
    sidebarCollapsed: false,
    sidebarHidden: false,
    sidebarWidth: null,
    refreshed: false,
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setNavigationMode(state, navigationMode) {
      state.navigationMode = navigationMode;
    },
    setActiveMenu(state, activeMenu) {
      state.activeMenu = activeMenu;
    },
    setRobotSpeed(state, robotSpeed) {
      state.robotSpeed = robotSpeed;
    },
    setRobotDirection(state, robotDirection) {
      state.robotDirection = robotDirection;
    },
    setSidebarCollapsed(state, sidebarCollapsed) {
      state.sidebarCollapsed = sidebarCollapsed;
    },
    setSidebarHidden(state, sidebarHidden) {
      state.sidebarHidden = sidebarHidden;
    },
    setSidebarWidth(state, sidebarWidth) {
      state.sidebarWidth = sidebarWidth;
    },
    setRefreshed(state, refreshed) {
      state.refreshed = refreshed;
    },
  },
});

app.use(store);
