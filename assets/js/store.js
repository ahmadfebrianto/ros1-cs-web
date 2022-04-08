const store = Vuex.createStore({
  state: {
    status: 'Disconnected', // Connected, Disconnected
    timestamp: '',
    navigationMode: 'Interactive', // Joystick or Interactive
    activeMenu: 'Dashboard', // 'Dashboard', 'Joystick', 'Interactive'
    robotSpeed: 0.1, // m/s
    robotDirection: 'forward', // forward, backward, left, right
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
    setRobotDirection(state, robotDirection) {
      state.robotDirection = robotDirection;
    },
  },
});

app.use(store);
