const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

app.use(router);
