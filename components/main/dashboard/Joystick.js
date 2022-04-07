app.component('joystick', {
  template: `
    <div id="joystick" class="card shadow-sm px-2">
        <div class="card-body">
            <div class="col text-center">
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4 py-2 btn-arrow" @click="goForward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
                    </div>
                    <div class="col-4"></div>
                </div>
                <div class="row">
                    <div class="col-4 py-2 btn-arrow" @click="turnLeft">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </div>
                    <div class="col-4 py-2 btn-arrow" @click="stop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                        </svg>
                    </div>
                    <div class="col-4 py-2 btn-arrow" @click="turnRight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4 py-2 btn-arrow" @click="goBackward">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                    <div class="col-4"></div>
                </div>

            </div>
        </div>
    </div>
    
      `,

  props: ['ros'],

  methods: {

    goForward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: 0.1,
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
    },

    goBackward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
      });

      const twist = new ROSLIB.Message({
        linear: {
          x: -0.1,
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
          z: -0.3,
        },
      });

      topic.publish(twist);
      console.log('Moving right');
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
          z: 0.3,
        },
      });

      topic.publish(twist);
      console.log('Moving left');
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
    },
  },
});
