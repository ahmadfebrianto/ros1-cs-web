<template>
  <div class="card" style="margin-bottom: 100px">
    <div class="card-header">
      <h3>ROS UI</h3>
    </div>

    <div class="card-body">
      <div class="row">
        <!-- Connection View -->
        <connection-view v-model="logs"/>

        <!-- Navigation View -->
        <navigation-view />

        <!-- Log View -->
        <log-view v-model="logs" />
      </div>
    </div>
  </div>
</template>


<script>
import ConnectionView from "./components/ConnectionView.vue";
import LogView from "./components/LogView.vue";
import NavigationView from "./components/NavigationView.vue";

export default {
  data() {
    return {
      logs: [],
    };
  },

  components: {
    ConnectionView,
    LogView,
    NavigationView,
  },
};
</script>



