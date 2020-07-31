import { defineConfig } from 'umi';

export default defineConfig({
  title: 'H2 JSBox',
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    { path: '/', component: '@/index' },
  ],
  copy: ['extension/prod'],
  devtool: 'source-map',
});
