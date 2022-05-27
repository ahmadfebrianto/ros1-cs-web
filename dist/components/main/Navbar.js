app.component('navbar', {
  template:
    /* HTML */
    `
      <nav ref="navbar" class="bg-white-primary shadow-primary p-2">
        <button @click="toggleSidebar()" class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-justify-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div
          class="px-3 py-1 text-slate-50 text-sm float-right rounded-full"
          :class="connectionClass"
        >
          {{ connectionStatus }}
        </div>
      </nav>
    `,

  methods: {
    toggleSidebar() {
      emitter.emit('sidebarToggled');
    },
  },

  computed: {
    connectionStatus() {
      return this.$store.state.robotConnected ? 'Connected' : 'Disconnected';
    },

    connectionClass() {
      return this.$store.state.robotConnected
        ? 'bg-green-primary'
        : 'bg-red-primary';
    },
  },
});
