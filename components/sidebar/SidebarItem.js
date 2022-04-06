app.component('sidebarItem', {
  template:
    /*html*/
    `
    <router-link :to="item.route" class="">
      <img :src="item.svg" :alt="item.name" />
      {{ item.name }}
    </router-link>
    `,

  props: ['item'],
});

