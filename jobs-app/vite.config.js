import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: false,
    target: "es2022",
  },
  plugins: [
    vue(),
    federation({
      name: "jobs-app",
      remotes: {
        search_app: "http://localhost:5001/assets/searchApp.js",
      },
      shared: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
