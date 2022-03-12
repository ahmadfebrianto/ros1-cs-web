<template>
  <div class="card" style="margin-bottom : 100px">
    <div class="card-header">
      <h3>ROS UI</h3>
    </div>

    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
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
                      isConnected
                        ? 'text-white bg-success'
                        : 'text-white bg-danger'
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

              <button
                v-if="!isConnected"
                class="btn btn-primary"
                @click="connect"
              >
                Connect
              </button>
              <button v-else class="btn btn-danger" @click="disconnect">
                Disconnect
              </button>

              <!-- </form> -->
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Logs</h5>
            </div>

            <div class="card-body" style="height: 250px; overflow-y: auto;">
            <div v-for="(log, index) in logs" :key="index">
            <small>{{ log }}</small>
            </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Control Directions</h5>
            </div>
            <div class="card-body" style="height: 260px;">
              <div class="buttons">
                <button class="button up"  value="up"><span class="arrow-up arrow"></span></button>
                <button class="button down"  value="down"><span class="arrow-down arrow"></span></button>
                <button class="button right"  value="right"><span class="arrow-right arrow"></span></button>
                <button class="button left"  value="left"><span class="arrow-left arrow"></span></button>
              </div>
              <button class="reset">Reset</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
  
  .buttons{
    position: relative;
    width: 25rem;
    height: 21rem;
    /* top: 9rem; */
    left: 4rem;
  }
  
  .button{
    position: absolute;
    width: 3rem;
    height: 3rem;
  }
  
  .arrow{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  .arrow-up{
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 16px solid black;
  }
  
  .arrow-right{
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 16px solid black;
  }
  
  .arrow-left{
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right:16px solid black;
  }
  
  .arrow-down{
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 16px solid black;
  }
  
  .down{
    bottom: 11rem;
    left: 9rem;
  }
  
  .left{
    top: 3.5rem;
    left: 5rem;
  }
  
  
  .right{
    top: 3.5rem;
    right: 9rem;
  }
  
  .up{
    top: 0;
    left: 9rem;
  }
  
  .reset{
    position: relative;
    top: -10rem;
    width: 7rem;
    height: 3rem;
    left: 11rem;
  }
</style>

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
      logs: []
    };
  },

  methods: {
    connect() {
      this.ros = new ROSLIB.Ros({
         url: this.url,
       });

      this.ros.on("connection", () => {
         const message = "Connected to websocket server.";
        this.writeLog(message)
        console.log(message)

         this.isConnected = true;
         this.status = "Connected";
       });

       this.ros.on("error", (error) => {
         this.writeLog(error)
         console.log(error)
       });

       this.ros.on("close", () => {
        const message = "Disconnected from websocket server.";
        this.writeLog(message)
        console.log(message)

         this.isConnected = false;
         this.status = "Disconnected";
       });

      // this.isConnected = true;
      // this.status = "Connected";
    },

    disconnect() {
      this.ros.close();
      // this.isConnected = false;
      // this.status = "Disconnected";
    },

    writeLog(message) {
      let date = new Date()
      let logMessage = `[${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${message}`
      this.logs.unshift(logMessage)

    }
  },

  computed: {
    url() {
      return `ws://${this.host}:${this.port}`;
    },
  },
};
</script>
