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
    ],
  },
];
