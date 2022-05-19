app.component('speed', {
  template: `
    <div class="card">
      <div class="mb-1">
        <small class="text-gray-700 font-bold tracking-wider">Speed</small>
      </div>
      <div class="grid grid-cols-5
                w-full p-1 rounded-md
                bg-gray-tertiary text-blue-primary
                text-lg font-boldest text-center">
        <div 
          class="flex justify-center items-center
                hover:scale-150 cursor-pointer" 
          :class="checkMinSpeed()"
          @click="decreaseSpeed()">
          <img src="assets/images/speed/minus.svg" alt="Decrease Speed" />
        </div>
        <div class="col-span-3 text-md">
          {{ speed }}
        </div>
        <div 
          class="flex justify-center items-center
                hover:scale-150 cursor-pointer" 
          :class="checkMaxSpeed()"
          @click="increaseSpeed()">
          <img src="assets/images/speed/plus.svg" alt="Increase Speed" class="" />
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
