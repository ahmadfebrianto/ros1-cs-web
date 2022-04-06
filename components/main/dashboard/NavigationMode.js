app.component('navigation-mode', {
  template: `
    <div class="card shadow-sm">
        <div class="card-body pt-2">
        <small class="text-muted">Mode</small>
        <div class="form-check">
            <input 
                @click="this.$store.commit('setNavigationMode', 'interactive')"
                class="form-check-input" 
                type="radio" 
                name="navigation-mode" 
                id="mode-interactive" 
                :class="{ checked : this.$store.state.navigationMode === 'interactive' }">
            <label class="form-check-label" for="mode-interactive">
            Interactive
            </label>
        </div>
        <div class="form-check">
            <input 
                @click="this.$store.commit('setNavigationMode', 'joystick')"
                class="form-check-input" 
                type="radio" 
                name="navigation-mode" 
                id="mode-joystick"
                :class="{ checked : this.$store.state.navigationMode === 'joystick' }">
            <label class="form-check-label" for="mode-joystick">
            Joystick
            </label>
        </div>
        </div>

        <p>{{ this.$store.state.navigationMode }}</p>
    </div>
    
      `,
});
