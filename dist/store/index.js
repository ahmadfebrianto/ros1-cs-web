const store = Vuex.createStore({
  state: {
    ros: null,
    navigatorClient: null,
    connection: null,
    status: 'Disconnected', // Connected, Disconnected
    navigationMode: 'Interactive', // Joystick or Interactive
    activeMenu: 'Dashboard', // 'Dashboard', 'Settings', 'Documentation', 'About'
    linearSpeed: 0.1,
    angularSpeed: 0.1,
    robotDirection: 'forward', // forward, backward, left, right
    robotMoving: false,
    sidebarCollapsed: false,
    sidebarHidden: false,
    sidebarWidth: null,
    refreshed: false,
  },

  mutations: {
    setRos(state, ros) {
      state.ros = ros;
    },

    setNavigatorClient(state, navigatorClient) {
      state.navigatorClient = navigatorClient;
    },

    setConnection(state, connection) {
      state.connection = connection;
    },

    setStatus(state, status) {
      state.status = status;
    },

    setNavigationMode(state, navigationMode) {
      state.navigationMode = navigationMode;
    },

    setActiveMenu(state, activeMenu) {
      state.activeMenu = activeMenu;
    },

    setLinearSpeed(state, linearSpeed) {
      state.linearSpeed = linearSpeed;
    },

    setAngularSpeed(state, angularSpeed) {
      state.angularSpeed = angularSpeed;
    },

    setRobotDirection(state, robotDirection) {
      state.robotDirection = robotDirection;
    },

    setRobotMoving(state, robotMoving) {
      state.robotMoving = robotMoving;
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
