<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        <h5>Logs</h5>
      </div>

      <div class="card-body" style="height: 250px; overflow-y: auto">
        <div v-for="(log, index) in logs" :key="index">
          <small>{{ log }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogView",
  props: ["modelValue"],

  computed: {
    logs() {
      return this.modelValue;
    },
  },
};
</script>