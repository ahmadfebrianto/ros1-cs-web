app.component('sidebarItem', {
  template:
    /*html*/
    `
    <router-link :to="item.route" class="nav-link align-middle px-0">
      <img :src="item.svg" :alt="item.name" />
      {{ item.name }}
    </router-link>
    `,

  props: ['item'],
});

