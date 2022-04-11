app.component('sidebarItem', {
  template:
    /*html*/
    `
    <router-link 
      :to="item.route" 
      :class="this.$store.state.sidebarCollapsed ? 'sidebar-menu-item-a' : ''">
      <img 
        :class="this.$store.state.sidebarCollapsed ? '' : 'sidebar-item-icon'" 
        :src="item.svg" 
        :alt="item.name"
         />
      <transition name="fade">
        <span class="sidebar-item-name" v-if="!this.$store.state.sidebarCollapsed">
          {{ item.name }}
        </span>
      </transition>
    </router-link>
    `,

  props: ['item'],
});
