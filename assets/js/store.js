const store = Vuex.createStore({
  state: {
    status: 'Disconnected',
    timestamp: '',
    navigationMode: '',
    activeMenu: '', 
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
  },
});

app.use(store);
