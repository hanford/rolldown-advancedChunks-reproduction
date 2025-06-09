import path from "path";
import { plugin as register, type BunPlugin } from "bun";
import { flatRoutes } from "@react-router/fs-routes";

function setAppDirectory(directory: string) {
  (globalThis as any).__reactRouterAppDirectory = directory;
}

const BUILD_CLIENT_ROUTE_QUERY = "?__react-router-build-client-route";

const CLIENT_EXPORTS = [
  "default",
  "ErrorBoundary",
  "HydrateFallback",
  "Layout",
  "meta",
  "links",
  "handle",
  "shouldRevalidate",
  "clientLoader",
  "clientAction",
  "unstable_clientMiddleware",
];

// Server exports we want to lazily invoke when running in Bun.serve
const SERVER_EXPORTS = ["loader", "action"];

const plugin: BunPlugin = {
  name: "react-router-bun",
  setup(build) {
    const routesFile = path.resolve("./app/routes.ts");

    // Support any import that resolves to app/routes.ts
    build.onResolve({ filter: /.*/ }, args => {
      const withoutQuery = args.path.split("?")[0];
      const resolved = path.resolve(args.resolveDir, withoutQuery);
      if (resolved === routesFile || resolved + ".ts" === routesFile) {
        return { path: routesFile, namespace: "react-router-routes" };
      }
    });

    build.onLoad({ filter: /.*/, namespace: "react-router-routes" }, async () => {
      setAppDirectory(path.resolve("./app"));
      const config = await flatRoutes();
      return {
        contents:
          "import type { RouteConfig } from '@react-router/dev/routes';\n" +
          `export default ${JSON.stringify(config)} satisfies RouteConfig;`,
        loader: "ts",
      };
    });

    build.onResolve({ filter: /\\?__react-router-build-client-route$/ }, args => {
      const resolved = path.resolve(args.importer ? path.dirname(args.importer) : process.cwd(), args.path);
      return { path: resolved, namespace: "react-router-client" };
    });

    build.onLoad({ filter: /.*/, namespace: "react-router-client" }, async args => {
      const sourcePath = args.path.replace(BUILD_CLIENT_ROUTE_QUERY, "");
      const clientLines = CLIENT_EXPORTS.map(
        name => `export { ${name} } from ${JSON.stringify(sourcePath)};`
      ).join("\n");

      const serverLines = SERVER_EXPORTS.map(name => {
        return `export async function ${name}(opts) {\n` +
          `  const mod = await import(${JSON.stringify(sourcePath)});\n` +
          `  return typeof mod.${name} === 'function' ? mod.${name}(opts) : undefined;\n` +
          `}`;
      }).join("\n\n");

      return { contents: clientLines + "\n" + serverLines, loader: "js" };
    });
  },
}; 

register(plugin);
export default plugin;
