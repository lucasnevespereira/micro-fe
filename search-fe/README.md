# Search Micro Frontend (remote app)

Create remote application

```
pnpm create vite search-fe --template vue
```
Install vite plugin federation
```
pnpm add @originjs/vite-plugin-federation -D
```
Add port to package.json scripts
```
  "scripts": {
    "dev": "vite --port 5001 --strictPort",
    "build": "vite build",
    "preview": "vite preview --port 5001 --strictPort",
    "serve": "vite preview --port 5001 --strictPort"
  },
```

Configure remote module federation in `vite.config.js` to expose components
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
      name: "search-app",
      filename: "searchApp.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: ["vue"],
    }),
  ],
  ...
})
```

Then build and serve remote application
```
pnpm run build && pnpm run serve
```

This will generate searchApp.js file (manifest) in `http://localhost:5001/assets/searchApp.js` that will be imported in our host application

