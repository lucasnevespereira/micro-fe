# Movie App (host application)

Create host application
```
pnpm create vite movie-app --template vue
```
Install vite plugin federation
```
pnpm add @originjs/vite-plugin-federation -D
```

Configure module federation in `vite.config.js` to receive remoteapps

```
import federation from "@originjs/vite-plugin-federation";
...
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: false,
    target: "es2022",
  },
  plugins: [
    vue(),
    federation({
      name: "movie-app",
      remotes: {
        search_app: "http://localhost:5001/assets/searchApp.js",
      },
      shared: ["vue"],
    }),
  ],
})
```

build and preview (serve) app
```
pnpm run build && pnpm run preview
```
