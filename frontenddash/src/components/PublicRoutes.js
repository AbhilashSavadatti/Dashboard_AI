import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicRoute = ({ children }) => {
  const { user, isLogined, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard or home page if the user is already logged in
    if (!loading && isLogined && user?.access_token) {
      navigate("/"); // or your home page route
    }
  }, [loading, isLogined, user, navigate]);

  if (loading) {
    // Show a loading screen until user validation is done
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  // Return the public route content (children) only if the user is not logged in
  if (isLogined || user?.access_token) {
    return null; // If user is logged in, return nothing (redirects happen in useEffect)
  }

  // Return the public content (children) if the user is not logged in
  return <>{children}</>;
};

export default PublicRoute;
