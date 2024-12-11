import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: 'autoUpdate',
      base: "/",
      srcDir: "src",
      filename: "sw.js",
      includeAssets: ["favicon.ico"], // Aquí también no necesitas "/public/"
      strategies: "injectManifest",
      manifest: {
        name: "Gym Bull's",
        short_name: "Bull's",
        start_url: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#fff",
        theme_color: "#E02424",
        icons: [
          {
            src: "/favicon1024x1024.png", // Ruta desde la raíz del servidor
            type: "image/png",
            sizes: "1024x1024"
          },
          {
            src: "/favicon1024x1024.png",
            type: "image/png",
            sizes: "1024x1024",
            purpose: "maskable"
          }
        ],
        description: "Compress and compare images with different codecs, right in your browser.",
        lang: "en",
        categories: [
          "photo",
          "productivity",
          "utilities"
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})