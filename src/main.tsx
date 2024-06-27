import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import LayoutLogin from "./views/Shared/LayoutLogin";
import Login from "./views/Auth/Login";
import NotFound from "./views/Error/NotFound";
import Register from "./views/Auth/Register";
import Layout from "./views/Shared/Layout";
import Books from "./views/Books";
import Home from "./views/Home";
import axios from "axios";
import Book from "./views/Books/Book";

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
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    loader: protectedLoader,
  },
  {
    path: "/books",
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
    loader: protectedLoader,
  },
  {
    path: "/books/edit/:id",
    element: (
      <Layout>
        <Book />
      </Layout>
    ),
  },
]);

const title = document.querySelector("title");
if (title) {
  title.text = process.env.VITE_APP_NAME ?? "Mi Biblioteca";
}

async function protectedLoader({ request }: LoaderFunctionArgs) {
  let isAuthenticated: boolean = false;
  const token = localStorage.getItem("token");
  if (token) {
    const api = process.env.VITE_APP_API_URL;
    const url = `${api}/auth/verify`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      isAuthenticated = response.data.isAuthenticated;
    }
  }
  if (!isAuthenticated) return redirect("/");
  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
