import { defineConfig } from 'umi';

const port = 8222;

export default defineConfig({
  devServer: {
    port
  },
  publicPath: `http://localhost:${port}/`
});
