app.component('joystick', {
  template: `
    <div id="joystick" class="card">
        <div class="grid grid-cols-3">
          <div 

            v-for="button in joystickButtons" 
            :class="button.icon ? 'joystick-button' : ''">
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
        },
        {
          name: 'top-middle',
          icon: 'assets/images/joystick/caret-up.svg',
        },
        {
          name: 'top-right',
          icon: '',
        },
        {
          name: 'middle-left',
          icon: 'assets/images/joystick/caret-left.svg',
        },
        {
          name: 'middle-middle',
          icon: 'assets/images/joystick/stop-fill.svg',
        },
        {
          name: 'middle-right',
          icon: 'assets/images/joystick/caret-right.svg',
        },
        {
          name: 'bottom-left',
          icon: '',
        },
        {
          name: 'bottom-middle',
          icon: 'assets/images/joystick/caret-down.svg',
        },
        {
          name: 'bottom-right',
          icon: '',
        },

      ]
    }
  },

  methods: {
    goForward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: this.$store.state.robotSpeed,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: 0,
        },
      });

      move.publish(twist);
      console.log('Moving forward');
      this.$store.commit('setRobotDirection', 'forward');
    },

    goBackward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: -this.$store.state.robotSpeed,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: 0,
        },
      });

      move.publish(twist);
      console.log('Moving backward');
      this.$store.commit('setRobotDirection', 'backward');
    },

    turnRight() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: 0,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: -this.$store.state.robotSpeed,
        },
      });

      topic.publish(twist);
      console.log('Moving right');
      this.$store.commit('setRobotDirection', 'right');
    },

    turnLeft() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: 0,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: this.$store.state.robotSpeed,
        },
      });

      topic.publish(twist);
      console.log('Moving left');
      this.$store.commit('setRobotDirection', 'left');
    },

    stop() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
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
      });

      topic.publish(twist);
      console.log('Stopping');
      this.$store.commit('setRobotDirection', 'stop');
    },
  },

  mounted() {
    emitter.on('robotSpeedChanged', (type, e) => {
      if (this.$store.state.robotDirection === 'forward') {
        this.goForward();
      } else if (this.$store.state.robotDirection === 'backward') {
        this.goBackward();
      } else if (this.$store.state.robotDirection === 'right') {
        this.turnRight();
      } else if (this.$store.state.robotDirection === 'left') {
        this.turnLeft();
      }
    });
  },
});
