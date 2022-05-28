const store = Vuex.createStore({
  state: {
    ros: null,
    navigatorClient: null,
    connectionData: { ip: 'localhost', port: '9090' },
    robotConnected: null,
    navigationMode: 'Navigation Goal',
    goalSet: false,
    activeMenu: 'Dashboard',
    linearSpeed: 0.1,
    angularSpeed: 0.1,
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

    setConnectionData(state, connectionData) {
      state.connectionData = connectionData;
    },

    setRobotConnected(state, robotConnected) {
      state.robotConnected = robotConnected;
    },

    setNavigationMode(state, navigationMode) {
      state.navigationMode = navigationMode;
    },

    setGoalSet(state, goalSet) {
      state.goalSet = goalSet;
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
