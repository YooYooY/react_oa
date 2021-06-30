export default [
  {
    path: '/login',
    component: '@/pages/login',
  },
  {
    path: '/',
    exact: false,
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/manage' },
      { path: '/manage', component: '@/pages/manage' },
      { path: '/note', component: '@/pages/note' },
      { path: '/plan', component: '@/pages/plan' },
      { path: '/knowledge', component: '@/pages/knowledge' },
    ],
  },
];
