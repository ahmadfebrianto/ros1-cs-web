app.component('navigation-mode', {
  template: `
    <div class="card">
        <div class="">
          <small class="">Mode</small>
          <div class="" v-for="navigationMode in navigationModes">
              <navigation-mode-item :navigationMode="navigationMode" />
          </div>
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
        @click="this.$store.commit('setNavigationMode', navigationMode.name)"
        class="" 
        type="radio" 
        name="navigation-mode" 
        :id="navigationMode.id"
        :checked="this.$store.state.navigationMode === navigationMode.name">

    <label class="" :for="navigationMode.id">
        {{ navigationMode.name}}
    </label>
  `,
  props: ['navigationMode'],
});
