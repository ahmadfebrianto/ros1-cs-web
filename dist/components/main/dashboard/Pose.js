app.component('pose', {
  template:
    /* HTML */
    `
      <div class="card flex flex-col">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider">Position</small>
        </div>
        <div v-for="(posValue, posLabel) in position" class="flex items-center">
          <div class="basis-1/5 text-center justify-center">
            <small>{{ posLabel }}</small>
          </div>
          <div class="input basis-4/5 pl-4">
            <small>{{ posValue }}</small>
          </div>
        </div>
      </div>

      <div class="card flex flex-col">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider"
            >Orientation</small
          >
        </div>
        <div
          v-for="(orValue, orLabel) in orientation"
          class="flex items-center"
        >
          <div class="basis-1/5 text-center justify-center">
            <small>{{ orLabel }}</small>
          </div>
          <div class="input basis-4/5 pl-4">
            <small>{{ orValue }}</small>
          </div>
        </div>
      </div>
    `,

  data() {
    return {
      position: {
        x: '?',
        y: '?',
        z: '?',
      },

      orientation: {
        x: '?',
        y: '?',
        z: '?',
        w: '?',
      },
    };
  },

  computed: {
    ros() {
      return this.$store.state.ros;
    },

    robotConnected() {
      return this.$store.state.robotConnected;
    },
  },

  methods: {
    getRobotPose() {
      var topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/robot_pose',
        messageType: 'geometry_msgs/Pose',
      });

      topic.subscribe((message) => {
        if (message !== null && typeof message !== 'undefined') {
          this.position.x = message.position.x;
          this.position.y = message.position.y;
          this.position.z = message.position.z;

          this.orientation.x = message.orientation.x;
          this.orientation.y = message.orientation.y;
          this.orientation.z = message.orientation.z;
          this.orientation.w = message.orientation.w;
        }
      });
    },

    clearPosition() {
      this.position.x = '?';
      this.position.y = '?';
      this.position.z = '?';
    },

    clearOrientation() {
      this.orientation.x = '?';
      this.orientation.y = '?';
      this.orientation.z = '?';
      this.orientation.w = '?';
    },
  },

  mounted() {
    emitter.on('connected', () => {
      this.getRobotPose();
    });

    emitter.on('disconnected', () => {
      this.clearPosition();
      this.clearOrientation();
    });

    if (this.robotConnected) {
      this.getRobotPose();
    }
  },
});
