import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Home from "./components/Home";
import Privacy from "./components/Privacy";
import Tos from "./components/Tos";
import DevBrowseUsers from "./components/DevBrowseUsers";
import DevBrowseOutputs from "./components/DevBrowseOutputs";
import Data from "./components/Data";
import NotFound from "./components/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "privacy", element: <Privacy /> },
      { path: "tos", element: <Tos /> },
      { path: "dev-browse-users", element: <DevBrowseUsers /> },
      { path: "dev-browse-outputs", element: <DevBrowseOutputs /> },
      { path: "data", element: <Data /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);