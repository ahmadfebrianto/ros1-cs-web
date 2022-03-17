<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h5>Connection</h5>
          </div>
          <div class="col-md-6">
            <span
              class="float-right rounded p-1 small text-white bg-primary"
              :class="
                isConnected ? 'text-white bg-success' : 'text-white bg-danger'
              "
              >{{ status }}</span
            >
          </div>
        </div>
      </div>

      <div class="card-body">
        <!-- <form> -->
        <div class="form-group">
          <label for="host">Host</label>
          <input
            type="text"
            class="form-control"
            id="host"
            name="host"
            v-model="host"
          />
        </div>

        <div class="form-group">
          <label for="port">Port</label>
          <input
            type="text"
            class="form-control"
            id="port"
            name="port"
            v-model="port"
          />
        </div>

        <button v-if="!isConnected" class="btn btn-primary" @click="connect">
          Connect
        </button>
        <button v-else class="btn btn-danger" @click="disconnect">
          Disconnect
        </button>

        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import ROSLIB from "roslib";

export default {
  data() {
    return {
      host: "localhost",
      port: "9090",
      isConnected: false,
      status: "Disconnected",
      ros: null,
    };
  },

  methods: {
    connect() {
      this.ros = new ROSLIB.Ros({
        url: this.url,
      });

      this.ros.on("connection", () => {
        const message = "Connected to websocket server.";
        this.writeLog(message);
        this.isConnected = true;
        this.status = "Connected";

        this.$emit("update:ros", this.ros);
      });

      this.ros.on("error", () => {
        const message = "Error connecting to websocket server.";
        this.writeLog(message);
      });

      this.ros.on("close", () => {
        const message = "Disconnected from websocket server.";
        this.writeLog(message);

        this.isConnected = false;
        this.status = "Disconnected";
        this.ros = null;
        this.$emit("update:ros", this.ros);
      });
    },

    disconnect() {
      this.ros.close();
    },

    writeLog(message) {
      let oldLogs = [...this.logs];
      let date = new Date();
      let logMessage = `[${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${message}`;
      oldLogs.push(logMessage);
      this.logs = oldLogs;
    },
  },

  props: ["modelValue"],

  computed: {
    url() {
      return `ws://${this.host}:${this.port}`;
    },

    logs: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>