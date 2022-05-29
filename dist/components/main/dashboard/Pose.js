app.component('pose', {
  template:
    /* HTML */
    `
      <div class="card flex flex-col">
        <div class="mb-1">
          <small class="text-gray-700 font-bold tracking-wider">Position</small>
        </div>
        <div class="flex items-center">
          <div class="basis-1/5 text-center justify-center">
            <small>X</small>
          </div>
          <div class="input basis-4/5 pl-4">
            <small>{{ posX }}</small>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <div class="basis-1/5 text-center">
            <small>Y</small>
          </div>
          <div class="input basis-4/5 pl-4">
            <small>{{ posY }}</small>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <div class="basis-1/5 text-center">
            <small>Z</small>
          </div>
          <div class="input basis-4/5 pl-4">
            <small>{{ posZ }}</small>
          </div>
        </div>
      </div>
    `,

  data() {
    return {
      posX: '?',
      posY: '?',
      posZ: '?',
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
          this.posX = message.position.x;
          this.posY = message.position.y;
          this.posZ = message.position.z;
        }
      });
    },
  },

  mounted() {
    emitter.on('connected', () => {
      this.getRobotPose();
    });

    emitter.on('disconnected', () => {
      this.posX = '?';
      this.posY = '?';
      this.posZ = '?';
    });

    if (this.robotConnected) {
      this.getRobotPose();
    }
  },
});
