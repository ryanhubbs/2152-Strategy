/* eslint-env node */

import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { liveReload } from "vite-plugin-live-reload";
import postcssNested from "postcss-nested";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, postcssNested]
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [
    ReactivityTransform(),
    vue(),
    VitePWA({
      includeAssets: ["assets/*", "icons/*"],
      manifest: {
        name: "SMASH Strategy",
        short_name: "Strategy",
        description: "A strategy app for FRC Team 2152",
        theme_color: "#ff0090",
        background_color: "#ff0090",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    liveReload([
      "public/"
    ])
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
});
