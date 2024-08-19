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
        <Link to="/" style={{ marginRight: "15px" }}>Highlighted</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

// Set basename to '/car-market-analytics' if your app is served from that subdirectory
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Highlight />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Dashboard />
        </>
      ),
    },
  ],
  {
    basename: "/carmarket_analytics", // Add this line
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
