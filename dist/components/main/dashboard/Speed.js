app.component('speed', {
  template: `
    <div class="card">
      <div class="mb-1">
        <small class="text-gray-700 font-bold tracking-wider">Max Speed</small>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-5">
          <div class="basis-1/3 flex items-center pl-2">
            <small>Linear</small>
          </div>
          
          <div class="grid grid-cols-5
                      w-full p-1 rounded-md
                      bg-gray-tertiary text-blue-primary
                      font-semibold text-center
                      basis-2/3">
            <div class="flex justify-center items-center
                        hover:scale-150 cursor-pointer" 
                :class="checkMinSpeed(computedLinearSpeed)"
                @click="decreaseSpeed('L')">
              <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
            </div>
            <div class="col-span-3 text-md">
              {{ computedLinearSpeed }}
            </div>
            <div class="flex justify-center items-center
                        hover:scale-150 cursor-pointer" 
                :class="checkMaxSpeed(computedLinearSpeed)"
                @click="increaseSpeed('L')">
              <img src="assets/icons/speed/plus.svg" alt="Increase Speed" class="" />
            </div>
          </div>
        </div>

        <div class="flex flex-row gap-5">
          <div class="basis-1/3 flex items-center pl-2">
            <small>Angular</small>
          </div>
          
          <div class="grid grid-cols-5
                      w-full p-1 rounded-md
                      bg-gray-tertiary text-blue-primary
                      font-semibold text-center
                      basis-2/3">
            <div class="flex justify-center items-center
                        hover:scale-150 cursor-pointer" 
                :class="checkMinSpeed(computedAngularSpeed)"
                @click="decreaseSpeed('A')">
              <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
            </div>
            <div class="col-span-3 text-md">
              {{ computedAngularSpeed }}
            </div>
            <div class="flex justify-center items-center
                        hover:scale-150 cursor-pointer" 
                :class="checkMaxSpeed(computedAngularSpeed)"
                @click="increaseSpeed('A')">
              <img src="assets/icons/speed/plus.svg" alt="Increase Speed" class="" />
            </div>
          </div>
        </div>
      
      </div>

    </div>
  `,

  data() {
    return {
      linearSpeed: {
        type: Number,
      },
      angularSpeed: {
        type: Number,
      },
    };
  },

  computed: {
    computedLinearSpeed() {
      return Math.floor(this.linearSpeed * 10);
    },
    computedAngularSpeed() {
      return Math.floor(this.angularSpeed * 10);
    },
  },

  methods: {
    commitRobotSpeed(type) {
      if (type === 'L') {
        this.$store.commit('setLinearSpeed', this.linearSpeed);
        this.sendLog(`Linear speed set to ${this.computedLinearSpeed}`, 'success');
      } else {
        this.$store.commit('setAngularSpeed', this.angularSpeed);
        this.sendLog(`Angular speed set to ${this.computedAngularSpeed}`, 'success');
      }
    },

    increaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed += 0.1;
      } else {
        this.angularSpeed += 0.1;
      }
      this.commitRobotSpeed(type);
    },

    decreaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed -= 0.1;
      } else {
        this.angularSpeed -= 0.1;
      }
      this.commitRobotSpeed(type);
    },

    checkMaxSpeed(speed) {
      if (speed >= 20) {
        return 'pointer-events-none';
      }
      return '';
    },

    checkMinSpeed(speed) {
      if (speed <= 1) {
        return 'pointer-events-none';
      }
      return '';
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  mounted() {
    this.linearSpeed = this.$store.state.linearSpeed;
    this.angularSpeed = this.$store.state.angularSpeed;
  },
});
