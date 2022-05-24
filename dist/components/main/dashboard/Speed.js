app.component('speed', {
  template: `
    <div class="card">
      <div class="mb-1">
        <small class="text-gray-700 font-bold tracking-wider">Speed</small>
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
            <div 
              class="flex justify-center items-center
                    hover:scale-150 cursor-pointer" 
              :class="checkMinSpeed(linearSpeed)"
              @click="decreaseSpeed('L')">
              <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
            </div>
            <div class="col-span-3 text-md">
              {{ linearSpeed }}
            </div>
            <div 
              class="flex justify-center items-center
                    hover:scale-150 cursor-pointer" 
              :class="checkMaxSpeed(linearSpeed)"
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
            <div 
              class="flex justify-center items-center
                    hover:scale-150 cursor-pointer" 
              :class="checkMinSpeed(angularSpeed)"
              @click="decreaseSpeed('A')">
              <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
            </div>
            <div class="col-span-3 text-md">
              {{ angularSpeed }}
            </div>
            <div 
              class="flex justify-center items-center
                    hover:scale-150 cursor-pointer" 
              :class="checkMaxSpeed(angularSpeed)"
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

  methods: {
    commitRobotSpeed(type) {
      if (type === 'L') {
        this.$store.commit('setLinearSpeed', this.linearSpeed / 10);
        this.sendLog(`Linear speed set to ${this.linearSpeed}`, 'success');
      } else {
        this.$store.commit('setAngularSpeed', this.angularSpeed / 10);
        this.sendLog(`Angular speed set to ${this.angularSpeed}`, 'success');
      }
    },

    increaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed += 1;
      } else {
        this.angularSpeed += 1;
      }
      this.commitRobotSpeed(type);
    },

    decreaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed -= 1;
      } else {
        this.angularSpeed -= 1;
      }
      this.commitRobotSpeed(type);
    },

    checkMaxSpeed(speed) {
      if (speed >= 9) {
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
    this.linearSpeed = this.$store.state.linearSpeed * 10;
    this.angularSpeed = this.$store.state.angularSpeed * 10;
  },
});
