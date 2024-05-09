import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import App from "./App.tsx";
import Applications from "./pages/Applications.tsx";
import { Provider } from "react-redux";
import { setupStore } from "./store.ts";
import ShellLayout from "./ShellLayout.tsx";
import axiosInterceptor from "./services/axiosInterceptor.ts";
import axios from "axios";
import NotFound from "./NotFound.tsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import LanguageProvider from "./context/LanguageProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/investbank",
    element: <ShellLayout />,
    children: [
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "account-request",
        element: <App />,
      },
      {
        path: "account-request/:requestIDSlug",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  { path: "*", element: <NotFound /> },
]);
axiosInterceptor(axios);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />

      <Provider store={setupStore()}>
        <LanguageProvider>
          {" "}
          <RouterProvider router={router} />
        </LanguageProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
