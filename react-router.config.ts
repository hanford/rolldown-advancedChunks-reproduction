import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  buildDirectory: "./out",
  routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" },
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
