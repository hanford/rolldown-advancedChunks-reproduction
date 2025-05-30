import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const routes = flatRoutes();

export default routes satisfies RouteConfig;
