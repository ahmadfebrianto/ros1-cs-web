<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        <h5>Control Directions</h5>
      </div>
      <div class="card-body" style="height: 260px">
        <div class="buttons">
          <button class="button up" value="up" @click="goForward">
            <span class="arrow-up arrow"></span>
          </button>
          <button class="button down" value="down" @click="goBackward">
            <span class="arrow-down arrow"></span>
          </button>
          <button class="button right" value="right" @click="goRight">
            <span class="arrow-right arrow"></span>
          </button>
          <button class="button left" value="left" @click="goLeft">
            <span class="arrow-left arrow"></span>
          </button>
        </div>
        <button class="reset" @click="connect">Start</button>
        <button class="reset" @click="stop">Stop</button>
      </div>
    </div>
  </div>
</template>

<script>
import ROSLIB from "roslib";

export default {
  name: "NavigationView",

  data() {
    return {
      host: "192.168.101.94",
      port: "9900",
      isConnected: false,
      status: "Disconnected",
      ros: null,
    };
  },

  methods: {
    connect() {
      if (this.ros === null) {
        this.ros = new ROSLIB.Ros({
          url: this.url,
        });
      }

      this.ros.on("connection", () => {
        const message = "Connected to websocket server.";
        this.isConnected = true;
        this.status = "Connected";

        console.log(message);
      });

      this.ros.on("error", () => {
        const message = "Error connecting to websocket server.";
        console.log(message);
      });

      this.ros.on("close", () => {
        const message = "Disconnected from websocket server.";
        console.log(message);

        this.isConnected = false;
        this.status = "Disconnected";
        this.ros = null;
      });
    },

    disconnect() {
      this.ros.close();
    },

    goForward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
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
      console.log("Moving forward");
    },

    goBackward() {
      const move = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
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
      console.log("Moving backward");
    },

    goRight() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
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
      console.log("Moving right");
    },

    goLeft() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
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
      console.log("Moving left");
    },

    stop() {
      const topic = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
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
      console.log("Stopping");
    },
  },

  computed: {
    url() {
      return `ws://${this.host}:${this.port}`;
    },
  },
};
</script>

<style scoped>
.buttons {
  position: relative;
  width: 25rem;
  height: 21rem;
  /* top: 9rem; */
  left: 4rem;
}

.button {
  position: absolute;
  width: 3rem;
  height: 3rem;
}

.arrow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.arrow-up {
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 16px solid black;
}

.arrow-right {
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 16px solid black;
}

.arrow-left {
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 16px solid black;
}

.arrow-down {
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 16px solid black;
}

.down {
  bottom: 11rem;
  left: 9rem;
}

.left {
  top: 3.5rem;
  left: 5rem;
}

.right {
  top: 3.5rem;
  right: 9rem;
}

.up {
  top: 0;
  left: 9rem;
}

.reset {
  position: relative;
  top: -10rem;
  width: 7rem;
  height: 3rem;
  left: 11rem;
}
</style>

