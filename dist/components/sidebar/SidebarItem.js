app.component('sidebarItem', {
  template:
    /* HTML */
    `
      <router-link :to="item.route" class="block p-3">
        <img
          class="inline"
          :class="sidebarItemClass"
          :src="item.svg"
          :alt="item.name"
        />
        <span class="" v-if="!sidebarCollapsed"> {{ item.name }} </span>
      </router-link>
    `,
  props: ['item'],

  computed: {
    // If sidebar is not collapsed, add margin to the right of the icon
    sidebarItemClass() {
      return {
        'mr-2': !this.sidebarCollapsed,
      };
    },

    sidebarCollapsed() {
      return this.$store.state.sidebarCollapsed;
    },
  },
});
