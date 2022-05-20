app.component('navigation-mode', {
  template: `
    <div class="card">
        <div class="">
          <small class="text-gray-700 font-bold tracking-wider">Mode</small>
        </div>
        <div class="" v-for="navigationMode in navigationModes">
            <navigation-mode-item :navigationMode="navigationMode" />
        </div>
    </div>
    
      `,

  data() {
    return {
      navigationModes: [
        {
          id: 'mode-interactive',
          name: 'Interactive',
        },
        {
          id: 'mode-joystick',
          name: 'Joystick',
        },
      ],
    };
  },
});

app.component('navigation-mode-item', {
  template: `
    <input 
        @click="setNavigationMode(navigationMode.name)"
        class="form-check-input appearance-none rounded-full h-4 w-4 
              border border-gray-300 bg-white checked:bg-blue-primary 
              checked:border-blue-primaryfocus:outline-none 
              transition duration-200 mt-1 align-top bg-no-repeat 
              bg-center bg-contain float-left mr-2 cursor-pointer" 
        type="radio" 
        name="navigation-mode" 
        :id="navigationMode.id"
        :checked="this.$store.state.navigationMode === navigationMode.name">

    <label class="form-check-label inline-block text-gray-800 text-sm cursor-pointer" :for="navigationMode.id">
        {{ navigationMode.name}}
    </label>
  `,
  props: ['navigationMode'],

  methods: {
    setNavigationMode(mode) {
      this.$store.commit('setNavigationMode', mode);
      this.sendLog(`Navigation mode changed to ${mode}`);
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },
});
