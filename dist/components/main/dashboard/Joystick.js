app.component('joystick', {
  template: `
    <div id="joystick" class="card" :class="classObject">
        <div class="grid grid-cols-3">
          <div 
            v-for="button in joystickButtons" 
            :class="button.icon ? 'p-2 cursor-pointer flex justify-center hover:rounded-full hover:shadow-primary' : ''"
            @click="button.direction ? move(button.direction) : null"
          >
            <img :src="button.icon" alt="">
          </div>
        </div>
    </div>
    
      `,

  props: ['ros'],

  data() {
    return {
      joystickButtons: [
        {
          name: 'top-left',
          icon: '',
          direction: null,
        },
        {
          name: 'top-middle',
          icon: 'assets/icons/joystick/caret-up.svg',
          direction: 'forward',
        },
        {
          name: 'top-right',
          icon: '',
          direction: null,
        },
        {
          name: 'middle-left',
          icon: 'assets/icons/joystick/caret-left.svg',
          direction: 'left',
        },
        {
          name: 'middle-middle',
          icon: 'assets/icons/joystick/stop-fill.svg',
          direction: 'stop',
        },
        {
          name: 'middle-right',
          icon: 'assets/icons/joystick/caret-right.svg',
          direction: 'right',
        },
        {
          name: 'bottom-left',
          icon: '',
          direction: null,
        },
        {
          name: 'bottom-middle',
          icon: 'assets/icons/joystick/caret-down.svg',
          direction: 'backward',
        },
        {
          name: 'bottom-right',
          icon: '',
          direction: null,
        },
      ],
    };
  },

  computed: {
    classObject() {
      return {
        'pointer-events-none': this.$store.state.status === 'Disconnected',
      };
    },
  },

  methods: {
    move(direction) {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      let options = {
        linear: {
          x: 0,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: 0,
        },
      };

      const speed = this.$store.state.robotSpeed;

      if (direction === 'forward') {
        options.linear.x = speed;
      } else if (direction === 'backward') {
        options.linear.x = -speed;
      } else if (direction === 'left') {
        options.angular.z = speed;
      } else if (direction === 'right') {
        options.angular.z = -speed;
      }

      const twist = new ROSLIB.Message(options);
      topic.publish(twist);
      if (direction !== 'stop') {
        if (!this.$store.state.robotMoving) {
          this.$store.commit('setRobotMoving', true);
        }
        if (this.$store.state.robotDirection !== direction) {
          this.sendLog(`Moving ${direction}`, 'info');
        }
      } else {
        this.$store.commit('setRobotMoving', false);
        if (this.$store.state.robotDirection !== direction) {
          this.sendLog(`Stopping`, 'info');
        }
      }
      this.$store.commit('setRobotDirection', direction);
    },

    sendLog(text, category) {
      const log = { text, category };
      emitter.emit('addLog', log);
    },
  },

  mounted() {
    emitter.on('robotSpeedChanged', (type, e) => {
      if (this.$store.state.robotDirection === 'forward') {
        this.move('forward');
      } else if (this.$store.state.robotDirection === 'backward') {
        this.move('backward');
      } else if (this.$store.state.robotDirection === 'right') {
        this.move('right');
      } else if (this.$store.state.robotDirection === 'left') {
        this.move('left');
      }
    });
  },
});
