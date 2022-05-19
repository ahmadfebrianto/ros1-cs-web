app.component('sidebarItem', {
  template:
    `
    <router-link 
      :to="item.route" 
      class="block p-3">
      <img
        class="inline"
        :class="removeMarginRightIfCollapsed()"
        :src="item.svg" 
        :alt="item.name"
         />
      <span class="" v-if="!sidebarIsCollapsed()">
        {{ item.name }}
      </span>

    </router-link>
    `,
  props: ['item'],

  methods: {
    removeMarginRightIfCollapsed() {
      return this.$store.state.sidebarCollapsed ? 'collapsed' : 'mr-2';
    },
    sidebarIsCollapsed() {
      return this.$store.state.sidebarCollapsed;
    }
  },
});
