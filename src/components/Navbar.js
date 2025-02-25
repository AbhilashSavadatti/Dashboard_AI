import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // For the menu button
import logo from "../assets/icons/pngs/logo.png"; // Importing the logo
import axios from "axios";
import { useUser } from "../context/UserContext";
import "./ComponentsStyle.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Gemini 1.5 Flash (Free)"); // Default selection
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [apiKey, setApiKey] = useState(""); // State to store the API key
  const [currentModel, setCurrentModel] = useState(""); // Track model for API key input

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useUser();

  // const { access_token, token_type } = user;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClick = (action) => {
    console.log(`${action} clicked`);
    setIsMenuOpen(false); // Close the menu after an action
  };

  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSelection = (model) => {
    setSelectedModel(model); // Update selected model
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleTitleClick = (model) => {
    // Prevent modal for specific models
    if (
      model === "Gemini 1.5 Flash (Free)" ||
      model === "Gemini 1.5 Pro (Free)"
    ) {
      return;
    }
    setCurrentModel(model); // Set the current model for the popup
    setModalOpen(true); // Open the modal
  };

  const handleSave = () => {
    console.log(`API key for ${currentModel}: ${apiKey}`);
    setModalOpen(false); // Close the modal after saving
    setApiKey(""); // Reset the input field
  };

  const handleCancel = () => {
    setModalOpen(false); // Close the modal
    setApiKey(""); // Reset the input field
  };

  const models = [
    "Gemini 1.5 Flash (Free)",
    "Gemini 1.5 Pro (Free)",
    "Gemini 1.5 Flash (Custom)",
    "Gemini 1.5 Pro (Custom)",
    "Mistral AI",
    "OpenAI",
    "Perplexity",
    "Anthropic",
    "LLAMA 3.2",
    "Grok",
  ];

  const handleLogout = async () => {
    try {
      if (user?.access_token) {
        const headers = {
          Authorization: `Bearer ${user.access_token}`,
        };
        await axios.post(
          "https://v2back.smartcardai.com/logout",
          {},
          { headers }
        );
        logout();
        navigate("/");
      } else {
        console.error("No access token found. User is not logged in.");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="toolbar">
          {/* Logo and Company Name */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="company-name">SmartCard AI</span>
          </div>

          <div className="button-container">
            <div style={{ position: "relative" }}>
              {/* 
            <button style={styles.modelButton} onClick={handleDropdownToggle}>
              {selectedModel} ▼
            </button>
               */}
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {models.map((model, index) => (
                    <li key={index} className="dropdown-item">
                      <span
                        onClick={() => handleTitleClick(model)} // Conditional title click
                        className={
                          model === "Gemini 1.5 Flash (Free)" ||
                          model === "Gemini 1.5 Pro (Free)"
                            ? "model-title-disabled"
                            : "model-title"
                        }
                      >
                        {model}
                      </span>

                      <input
                        type="radio"
                        checked={model === selectedModel}
                        readOnly
                        onClick={() => handleSelection(model)}
                        className="radio"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="upgrade-button">Upgrade</button>
            <div style={{ position: "relative" }}>
              {/* Main Menu Button */}
              <button onClick={toggleMenu} className="menu-button">
                <FaBars />
              </button>

              {/* Dropdown Menu */}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3 className="modal-title">Enter API Key for {currentModel}</h3>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input"
                placeholder="Enter API Key"
              />
              <div className="modal-actions">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {isMenuOpen && (
        <div className="menu">
          <ul>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
