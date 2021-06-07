import path from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/components/LoadingCp',
  },
  dva: {
    immer: true,
  },
  devtool: 'source-map',
  antd: {},
  title: '成长管家',
  exportStatic: {},
  base: '/groupOA/',
  publicPath: '/groupOA/',
  outputPath: 'dist',
  routes: [
    {
      path: '/login',
      component: '../pages/login',
    },
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/manage',
        },
        {
          path: '/manage',
          component: '../pages/manage',
        },
        {
          path: '/plan',
          component: '../pages/plan',
        },
        {
          path: '/knowledge',
          component: '../pages/knowledge',
        },
        {
          path: '/note',
          component: '../pages/note',
        }
      ],
    },
  ],
  theme: {
    'primary-color': '#2F54EB',
    // "btn-primary-bg": "#2F54EB"
  },
  extraBabelPlugins: [['import', { libraryName: 'zarm', style: true }]],
  // sass: {},
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://139.186.158.100:3000/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
});
