import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import LayoutLogin from "./views/Shared/LayoutLogin";
import Login from "./views/Auth/Login";
import NotFound from "./views/Error/NotFound";
import Register from "./views/Auth/Register";
import Layout from "./views/Shared/Layout";
import Books from "./views/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutLogin>
        <Login />
      </LayoutLogin>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <LayoutLogin>
        <Login />
      </LayoutLogin>
    ),
  },
  {
    path: "/register",
    element: (
      <LayoutLogin>
        <Register />
      </LayoutLogin>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
  },
]);
const title = document.querySelector("title");
if (title) {
  title.text = process.env.VITE_APP_NAME ?? "Mi Biblioteca";
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
