import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  vite: () => ({
    plugins: [react()],
    // https://github.com/wxt-dev/wxt/issues/538
    build: {
      sourcemap: false,
    }
  }),
  srcDir: 'src',
  manifest: {
    permissions: [
      'storage',
      'cookies',
    ],
    host_permissions: [
      '*://*.layerx.jp/*',
    ]
  },
});
