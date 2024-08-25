import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import "./index.css";
import Highlight from "./components/highlight.jsx";
import Dashboard from "./components/dashboard.jsx";

// Create a simple Navbar component
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Car Market</div>
      <div>
        <Link to="/highlight" style={{ marginRight: "15px" }}>Highlighted</Link>
        <Link to="/">Dashboard</Link>
      </div>
    </nav>
  );
}



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/highlight",
      element: (
        <>
          <Navbar />
          <Highlight />
        </>
      ),
    },
  ],
  {
    basename: "/carmarket_analytics/",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
