const store = Vuex.createStore({
  state: {
    status: 'Disconnected',
    timestamp: '',
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setTimestamp(state, timestamp) {
      state.timestamp = timestamp;
    },
  },
});

app.use(store);
