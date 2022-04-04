const app = Vue.createApp({
  template: /*html*/ `
    
    <div id="app">
      <div class="row flex-nowrap">
        <sidebar />

        <div id="content" class="col gx-0">
          <navbar />
          <main class="container">
            <router-view />
          </main>
        </div>
      </div>
    </div>

  `,
  data() {
    return {};
  },
});
