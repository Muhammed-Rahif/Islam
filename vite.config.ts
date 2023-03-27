import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import manifest from './public/manifest.json';

export const pwaOptions: Partial<VitePWAOptions> = {
  base: '/quran',
  devOptions: {
    enabled: true,
    navigateFallback: 'index.html',
    type: 'module',
  },
  manifest,
  registerType: 'autoUpdate',
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return {
    plugins: [react(), VitePWA(pwaOptions), viteTsconfigPaths(), svgrPlugin()],
    server: {
      open: Boolean(process.env.BROWSER),
      port: Number(process.env.PORT) || 8100,
    },
  };
});
