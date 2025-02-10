import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="relative w-full shadow-sm flex items-center justify-between px-4 py-1.5 rounded-lg ">
      <div className="  items-start">
        <img src="./Logo.jpeg" alt="logo" className="h-12 w-auto" />
      </div>

      <div>
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button> // Show logout button if authenticated
        ) : (
          <Link to="/login">
            <Button className="rounded-full">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
