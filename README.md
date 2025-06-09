## rolldown-advancedChunks-reproduction

```
pnpm install
pnpm build
```

https://github.com/vitejs/rolldown-vite/issues/195

### Bun Development

This repo includes a small Bun plugin that mimics a subset of the React Router Vite plugin. It intercepts route modules imported with the `?__react-router-build-client-route` query and re-exports the client-facing symbols. Enable it via `bunfig.toml`:

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

When imported on the server, the generated modules expose async `loader()` and `action()` functions that proxy to the underlying route modules. You can call these from your `Bun.serve()` `fetch` handler to run React Router loaders and actions.

