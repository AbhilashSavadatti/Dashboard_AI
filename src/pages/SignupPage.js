import React, { useState } from "react";
import logo from "../assets/icons/pngs/logo.png"; // Importing the logo
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    tnc_accepted: false,
    privacy_accepted: false,
  });

  const [message, setMessage] = useState("");

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3ceba5",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "10px 0px",
    transition: "background-color 0.3s ease",
  };

  const toggleStyle = {
    marginTop: "1rem",
    textAlign: "center",
    color: "#3ceba5",
    cursor: "pointer",
    fontSize: "14px",
  };

  const styles = {
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      height: "40px",
      marginLeft: "50px",
    },
    companyName: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#444545",
    },
    googleBtnSyles: {
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

      justifyContent: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://v2back.smartcardai.com/register",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          name: formData.name,
          tnc_accepted: formData.tnc_accepted,
          privacy_accepted: formData.privacy_accepted,
        }
      );

      if (response.status === 200) {
        setMessage("Sign-up successful!");
      } else {
        setMessage(`Error: ${response.data.message || "Failed to sign up"}`);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || "Server error"}`);
      } else {
        setMessage("Network error. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/");
      const data = await response.json();
      const accessToken = data.access_token;

      // Save the token

      window.location.href = "https://v2back.smartcardai.com/login/oauth";
    } catch (error) {
      console.error("Google login redirect failed:", error.message);
      setMessage("Google login failed.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <span style={styles.companyName}>SmartCard AI</span>
        </div>
        <h2 style={{ textAlign: "center", color: "#3ceba5" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="tnc_accepted"
                  checked={formData.tnc_accepted}
                  onChange={handleChange}
                />
                I accept the terms and conditions
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="privacy_accepted"
                  checked={formData.privacy_accepted}
                  onChange={handleChange}
                />
                I accept the privacy policy
              </label>
            </div>
          </div>

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
          <button
            onClick={handleGoogleLogin}
            style={styles.googleBtnSyles}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ae8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4285F4")}
          >
            <span
              style={{
                marginRight: "8px", // Space between the icon and text
                fontSize: "20px", // Slightly larger size for the Google icon
              }}
            >
              <FaGoogle />
            </span>
            Sign in with Google
          </button>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: "red" }}>{message}</p>
        )}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div style={toggleStyle}>Already have an account? Login</div>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
