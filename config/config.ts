import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '成长管家',
  dva: {
    immer: true,
  },
  routes,
  history: {
    type: 'hash',
  },
  fastRefresh: {},
});
