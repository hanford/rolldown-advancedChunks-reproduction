## rolldown-advancedChunks-reproduction

```
pnpm install
pnpm build
```

https://github.com/vitejs/rolldown-vite/issues/195

### Bun Development

This repo includes a small Bun plugin that mimics a subset of the React Router Vite plugin. It generates the route config used by `app/routes.ts` and intercepts route modules imported with the `?__react-router-build-client-route` query to re-export the client-facing symbols. The plugin also registers itself at runtime so dynamic imports work under `Bun.serve()`. Enable it via `bunfig.toml`:

```toml
[serve]
port = 3000

[serve.static]
plugins = ["./bun-plugin-react-router.ts"]
```

Run the dev server with:

```bash
bun run index.html
```

The HTML file references `src/main.tsx`, which simply imports the React Router
client entry at `app/entry.client.tsx`. That entry now builds a router with
`createBrowserRouter` and passes it to `RouterProvider` so the page can boot
without requiring React Router's SSR mode.

When imported on the server, the generated modules expose async `loader()` and `action()` functions that proxy to the underlying route modules. You can call these from your `Bun.serve()` `fetch` handler to run React Router loaders and actions.

