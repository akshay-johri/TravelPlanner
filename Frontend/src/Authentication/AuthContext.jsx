import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create a Context for Authentication
const AuthContext = createContext();

// Custom hook to access authentication state
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const isLogged = localStorage.getItem("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const [loading, setLoading] = useState(false); // Loading state for login and registration requests
  const [error, setError] = useState(""); // Error state
  const API_URL = "http://localhost:8080"; // Backend URL
  // const navigate = useNavigate();

  // Check if the user is already authenticated after reload (e.g., using localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      // navigate("/")
    }
  }, []);

  // Login function to authenticate users
  const login = async (email, password) => {
    setLoading(true);
    setError(""); // Reset error state before making the request

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true"); // Store the authentication state
        setError(""); // Clear any previous error
        return { success: true };
      }
    } catch (err) {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated"); // Clear any session data
      setError("*Invalid email or password. Please try again!");
      return { success: false, error: "Invalid email or password" };
    } finally {
      setLoading(false);
    }
  };

  // Register function to create a new user
  const register = async (email, password) => {
    setLoading(true);
    setError(""); // Reset error state before making the request

    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });

      if (response.status === 200) {
        setError(""); // Clear any previous error
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data || "*Registration failed. Please try again!");
      return {
        success: false,
        error: err.response?.data || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function to clear authentication state
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear the authentication session
  };

  const value = {
    isAuthenticated, // Provide authentication state
    loading, // Provide loading state
    error, // Provide error state
    login, // Provide login function
    register, // Provide register function
    logout, // Provide logout function
    setError, // Allow to set error manually
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
