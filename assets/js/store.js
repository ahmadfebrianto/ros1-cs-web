const store = Vuex.createStore({
  state: {
    status: 'Disconnected',
    timestamp: '',
    navigationMode: 'Interactive',
    activeMenu: 'Dashboard',
    robotSpeed: 0.1,
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setTimestamp(state, timestamp) {
      state.timestamp = timestamp;
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
  },
});

app.use(store);
