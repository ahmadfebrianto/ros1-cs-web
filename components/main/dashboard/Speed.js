app.component('speed', {
  template: `
    <div class="card shadow-sm mb-2">
        <div class="card-body pt-2">
            <div class="row">
                <small class="text-muted">Speed</small>
                <small class="text-danger">{{ speed }}</small>
            </div>
            <input 
                  @change="setRobotSpeed" 
                  v-model="speed"
                  type="range" 
                  class="form-range" 
                  min="1" max="5" 
                  step=1 
                  id="customRange2">
        </div>
    </div>
  `,

  data() {
    return {
      speed: {
        type: Number,
      },
    };
  },

  methods: {
    setRobotSpeed() {
      this.$store.commit('setRobotSpeed', this.speed / 10);
      console.log(this.$store.state.robotSpeed);
    },
  },

  mounted() {
    this.speed = this.$store.state.robotSpeed * 10;
  },
});
