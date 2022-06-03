app.component('speed', {
  template:
    /* HTML */
    `
      <div class="card">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider"
            >Max Speed</small
          >
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-5">
            <div class="basis-2/4 flex items-center pl-2">
              <small>Linear</small>
              <small class="ml-2 bg-gray-300 rounded-md p-1 text-xxxs"
                >m/s</small
              >
            </div>

            <div
              class="grid grid-cols-5
                      w-full p-1 rounded-md
                      bg-gray-tertiary text-blue-primary
                      font-semibold text-center
                      basis-2/4"
            >
              <div
                class="flex justify-center items-center
                        hover:scale-150 cursor-pointer"
                :class="checkMinSpeed(linearSpeed)"
                @click="decreaseSpeed('L')"
              >
                <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
              </div>
              <div class="col-span-3 text-sm tracking-widest">
                {{ linearSpeed }}
              </div>
              <div
                class="flex justify-center items-center
                        hover:scale-150 cursor-pointer"
                :class="checkMaxSpeed(linearSpeed)"
                @click="increaseSpeed('L')"
              >
                <img
                  src="assets/icons/speed/plus.svg"
                  alt="Increase Speed"
                  class=""
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row gap-5">
            <div class="basis-2/4 flex items-center pl-2">
              <small>Angular</small>
              <small class="ml-2 bg-gray-300 rounded-md p-1 text-xxxs"
                >rad/s</small
              >
            </div>

            <div
              class="grid grid-cols-5
                      w-full p-1 rounded-md
                      bg-gray-tertiary text-blue-primary
                      font-semibold text-center
                      basis-2/4"
            >
              <div
                class="flex justify-center items-center
                        hover:scale-150 cursor-pointer"
                :class="checkMinSpeed(angularSpeed)"
                @click="decreaseSpeed('A')"
              >
                <img src="assets/icons/speed/minus.svg" alt="Decrease Speed" />
              </div>
              <div class="col-span-3 text-sm tracking-widest">
                {{ angularSpeed }}
              </div>
              <div
                class="flex justify-center items-center
                        hover:scale-150 cursor-pointer"
                :class="checkMaxSpeed(angularSpeed)"
                @click="increaseSpeed('A')"
              >
                <img
                  src="assets/icons/speed/plus.svg"
                  alt="Increase Speed"
                  class=""
                />
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
        this.$store.commit('setLinearSpeed', this.linearSpeed);
        this.sendLog(`Linear speed set to ${this.linearSpeed}`, 'success');
      } else {
        this.$store.commit('setAngularSpeed', this.angularSpeed);
        this.sendLog(`Angular speed set to ${this.angularSpeed}`, 'success');
      }
    },

    increaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed = Number(Number(this.linearSpeed + 0.1).toFixed(1));
      } else {
        this.angularSpeed = Number(Number(this.angularSpeed + 0.1).toFixed(1));
      }
      this.commitRobotSpeed(type);
    },

    decreaseSpeed(type) {
      if (type === 'L') {
        this.linearSpeed = Number(Number(this.linearSpeed - 0.1).toFixed(1));
      } else {
        this.angularSpeed = Number(Number(this.angularSpeed - 0.1).toFixed(1));
      }
      this.commitRobotSpeed(type);
    },

    checkMaxSpeed(speed) {
      if (speed >= 5.0) {
        return 'pointer-events-none';
      }
      return '';
    },

    checkMinSpeed(speed) {
      if (speed <= 0.1) {
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
