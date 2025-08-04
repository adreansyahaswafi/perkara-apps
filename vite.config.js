import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

const VENDOR_LIST = [
  {
    group: '@router',
    members: ['react-router', 'react-router-dom', '@remix-run'],
  },
  'react',
  '@amcharts/amcharts5',
  'primereact',
  'react-tailwindcss-select',
  '@heroicons/react',
  'leaflet',
  'leaflet-defaulticon-compatibility',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteStaticCopy({
    targets: [
      {
        src: 'node_modules/leaflet/dist/images/*',
        dest: 'leaflet/images',
      },
    ],
  }),],
  assetsInclude: ['**/*.png', '**/*.svg', '**/.ico'],
  uild: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        /**
         * Manually define conditions for splitting chunks, to
         * keep them below size limit and be fetched in parallel.
         */
        manualChunks(id) {
          for (const item of VENDOR_LIST) {
            if (item?.group && item?.members?.some((name) => id.includes(name))) {
              return item.group;
            }

            if (id.includes(item)) {
              return item;
            }
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lodash'
    ],
    // exclude: ['some-package-you-dont-want-optimized']
  }
})
