import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import routes from "./routes";
import "./index.css";

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
