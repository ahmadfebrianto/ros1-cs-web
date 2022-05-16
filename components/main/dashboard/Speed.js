app.component('speed', {
  template: `
    <div class="card">
        <div class="">
            <div class="">
                <small class="text-muted">Speed</small>
                <small class="text-danger">{{ speed }}</small>
            </div>
            <input 
                  @change="setRobotSpeed" 
                  v-model="speed"
                  type="range" 
                  class="" 
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
      emitter.emit('setRobotSpeed');
      console.log(this.$store.state.robotSpeed);
    },
  },

  mounted() {
    this.speed = this.$store.state.robotSpeed * 10;
  },
});