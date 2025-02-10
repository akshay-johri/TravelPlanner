import React, { StrictMode } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import { AuthProvider } from "./Authentication/AuthContext"; // Import AuthProvider
import { createBrowserRouter } from "react-router-dom"; // Browser Router
import Layout from "./components/Custome/Layout"; // Layout Component
import CreateTrip from "./createTrip"; // CreateTrip Component
import TripResults from "./createTrip/TripResults";
import LoginComponent from "./Authentication/LoginComponent"; // LoginComponent
import SignUp from "./Authentication/SignUp"; // SignUp Component
import PrivateRoute from "./Authentication/PrivateRoute"; // Protect routes
import Hero from "./components/Custome/Hero"; // Import Hero Component

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout will wrap everything
    children: [
      {
        path: "/",
        element: <Hero />, // Hero component as landing page
      },

      {
        path: "/trip-result",
        element: <TripResults />,
      },
      {
        path: "/create-trip",
        element: (
          <PrivateRoute>
            <CreateTrip /> {/* Protecting this route */}
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginComponent />, // Login page
      },
      {
        path: "/register",
        element: <SignUp />, // Registration page
      },
    ],
  },
]);

// Main entry point (index)
const root = ReactDOM.createRoot(document.getElementById("root")); // Make sure `root` exists in `index.html`

root.render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrapping everything in AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
