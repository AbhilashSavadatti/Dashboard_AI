import React, { useState } from "react";
import { FaPaperclip, FaMicrophone, FaPaperPlane } from "react-icons/fa";
import DataSourceModel from "../DataSourceModel";

export default function Dashchat() {
  const [showPopup, setShowPopup] = useState(false); // State to toggle the popup

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      {/* <div
        style={{
          backgroundColor: "#fff",
          border: "2px solid #34eba8", // Added border here
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <FaPaperclip
            style={{ marginRight: "10px", color: "grey", cursor: "pointer" }}
            onClick={togglePopup} // Toggle popup on click
          />
          <input
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              flex: 1,
              padding: "10px",
              fontSize: "16px",
            }}
            placeholder="Type a message..."
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          <FaMicrophone style={{ marginRight: "10px", color: "grey" }} />
          <FaPaperPlane style={{ color: "grey" }} />
        </div>
      </div> */}

      {/* Popup Component */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",

            borderRadius: "10px",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "900px",
            height: "500px",
          }}
        >
          <button
            onClick={togglePopup}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <DataSourceModel />
        </div>
      )}

      {/* Overlay */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={togglePopup} // Close popup when clicking outside
        />
      )}
    </>
  );
}
