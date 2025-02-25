import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { v2BackendURL } from "../constant/url";

const ProtectedRoutes = ({ children }) => {
  const { user, setUser, isLogined, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkValidUser = async () => {
      if (!user || !user.access_token) {
        // No user or missing access token, redirect to login
        setUser(null); // Clear user context if token is missing
        localStorage.removeItem("user"); // Clear user from localStorage
        navigate("/");
        return;
      }

      try {
        // Verify user token
        const res = await axios.get(`${v2BackendURL}/home`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        if (
          res.status === 200 &&
          res.data.message === "Welcome to the home page!"
        ) {
          console.log("User validated:", res.data.user_name);
        } else {
          // Invalid user response
          throw new Error("Invalid user response");
        }
      } catch (error) {
        console.error("User validation failed:", error.message);
        setUser(null); // Clear user context if validation fails
        localStorage.removeItem("user"); // Clear user from localStorage
        navigate("/"); // Redirect to login
      }
    };

    // Perform the user validation check only if the user is not already authenticated
    if (!loading) {
      if (!user || !user.access_token) {
        setUser(null); // Ensure user context is cleared if no user or token
        localStorage.removeItem("user");
        navigate("/");
      } else {
        checkValidUser(); // Proceed with checking the user if token exists
      }
    }
  }, [loading, user, navigate, setUser]);

  if (loading) {
    // Show a loading screen until user validation is done
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not logged in, redirect them immediately (without rendering anything)
  if (!isLogined || !user?.access_token) {
    return null;
  }

  // Return protected content (children) if the user is valid and token is verified
  return <>{children}</>;
};

export default ProtectedRoutes;
