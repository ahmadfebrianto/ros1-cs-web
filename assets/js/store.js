const store = Vuex.createStore({
  state: {
    status: 'Disconnected',
    timestamp: '',
    navigationMode: 'interactive', // interactive, joystick
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
  },
});

app.use(store);
