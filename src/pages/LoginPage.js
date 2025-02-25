import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import logo from "../assets/icons/pngs/logo.png";

const backendUrl = "https://v2back.smartcardai.com";
const LoginPage = () => {
  const { login, user } = useUser(); // Access login function from context
  const navigate = useNavigate(); // Hook to navigate between routes

  const [message, setMessage] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user === null) {
      const query = new URLSearchParams(window.location.search);
      const access_token = query.get("access_token");
      const token_type = query.get("token_type"); // Extract token_type from the query
      if (access_token && token_type) {
        login({ access_token, token_type }); // Include token_type in the object
        return navigate("/");
      }
    }
  }, [user, login, navigate]); // Include dependencies in the dependency array

  const handleGoogleLogin = () => {
    // Specify the URL you want to redirect the user to
    const redirectUrl = `http://127.0.0.1/login/oauth`;
    // const redirectUrl = `https://www.google.com/`;

    // Redirect the user
    window.location.href = redirectUrl;
  };

  // Handle username-password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/login`, input);

      const userData = response.data;

      // Save user data to context and localStorage
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Display success message
      setMessage("Login successful!");

      // Redirect to the home page after login
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
        setMessage(error.response.data.message || "Login failed.");
      } else {
        console.error("Error during login:", error.message);
        setMessage("An error occurred. Please try again.");
      }

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <div>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </div>
        <h2 style={{ textAlign: "center", color: "#3ceba5" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            placeholder="Username"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
          <input
            type="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#3ceba5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px 0px",
            }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", margin: "10px 0", color: "#888" }}>
          OR
        </div>
        <button
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: "#4285F4",
            color: "#fff",
            padding: "8px 24px",
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            margin: "10px 0px",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          type="button"
        >
          <FaGoogle style={{ marginRight: "8px", fontSize: "20px" }} />
          Sign in with Google
        </button>
        {/* <GoogleWrapper /> */}
        {message && (
          <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
        )}
        <Link to="/signup" style={{ textDecoration: "none", color: "#3ceba5" }}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
