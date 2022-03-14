<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        <h5>Control Directions</h5>
      </div>
      <div class="card-body" style="height: 260px">
        <div class="buttons">
          <button class="button up" value="up">
            <span class="arrow-up arrow"></span>
          </button>
          <button class="button down" value="down">
            <span class="arrow-down arrow"></span>
          </button>
          <button class="button right" value="right">
            <span class="arrow-right arrow"></span>
          </button>
          <button class="button left" value="left">
            <span class="arrow-left arrow"></span>
          </button>
        </div>
        <button class="reset">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationView",
  data() {
    return {
      logs: [],
    };
  },

  methods: {
    addLog(log) {
      this.logs.push(log);
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

