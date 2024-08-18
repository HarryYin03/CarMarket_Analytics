import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Highlight from "./components/highlight";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Highlight />,
  },
  {
    basename: "/CarMarket_Analytics",
  }
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;