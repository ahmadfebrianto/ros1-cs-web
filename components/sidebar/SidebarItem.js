app.component('sidebarItem', {
  template:
    /*html*/
    `
    <router-link :to="item.route" class="sidebar-menu-link">
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
