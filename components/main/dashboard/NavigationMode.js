app.component('navigation-mode', {
  template: `
    <div class="card shadow-sm mb-2">
        <div class="card-body pt-2">
          <small class="text-muted">Mode</small>
          <div class="form-check" v-for="navigationMode in navigationModes">
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
        class="form-check-input" 
        type="radio" 
        name="navigation-mode" 
        :id="navigationMode.id"
        :checked="this.$store.state.navigationMode === navigationMode.name">

    <label class="form-check-label" :for="navigationMode.id">
        {{ navigationMode.name}}
    </label>
  `,
  props: ['navigationMode'],
});
