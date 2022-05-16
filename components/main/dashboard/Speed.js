app.component('speed', {
  template: `
    <div class="card">
      <div class="">
        <small class="">Speed</small>
      </div>
      <div id="input-speed">
        <div class="grid grid-cols-5">
          <div 
            class="input-speed-control" 
            :class="checkMinSpeed()"
            @click="decreaseSpeed()"
          >
            <img src="assets/images/speed/minus.svg" alt="Decrease Speed" />
          </div>
          <div class="col-span-3">
            {{ speed }}
          </div>
          <div 
            class="input-speed-control" 
            :class="checkMaxSpeed()"
            @click="increaseSpeed()"
          >
            <img src="assets/images/speed/plus.svg" alt="Increase Speed" class="" />
          </div>
        </div>
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
      emitter.emit('robotSpeedChanged');
    },

    increaseSpeed() {
      if (this.speed < 5) {
        this.speed = this.speed + 1;
        this.setRobotSpeed();
      }
    },

    decreaseSpeed() {
      this.speed = this.speed - 1;
      this.setRobotSpeed();
    },

    checkMaxSpeed() {
      if (this.speed >= 5) {
        return 'pointer-events-none';
      }
      return '';
    },

    checkMinSpeed() {
      if (this.speed <= 1) {
        return 'pointer-events-none';
      }
      return '';
    },
  },

  mounted() {
    this.speed = this.$store.state.robotSpeed * 10;
  },
});
