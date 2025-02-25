import React, { useState } from "react";
import {
  FaTimes,
  FaPlayCircle,
  FaPaperclip,
  FaToggleOff,
  FaToggleOn,
  FaChevronDown,
} from "react-icons/fa";
import Workflowviewer from "./Workflowviewer.js"; // Import Workflowviewer component
import Promptlibrary from "../Promptlibrary.js";

export default function Workflow() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [textAreaVisibility, setTextAreaVisibility] = useState({
    dataCleaning: false,
    eda: false,
    etl: false,
  });

  const [toggleState, setToggleState] = useState({
    dataCleaning: false,
    eda: false,
    etl: false,
  });

  const [playButtonState, setPlayButtonState] = useState({
    dataCleaning: false,
    eda: false,
    etl: false,
  });

  // Function to toggle the visibility of the textarea for a specific card
  const toggleTextArea = (card) => {
    setTextAreaVisibility((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

  // Function to toggle the state of the toggle button for a specific card
  const toggleButtonState = (card) => {
    setToggleState((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

  // Function to toggle Play button color
  const togglePlayButton = (card) => {
    setPlayButtonState((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setIsPromptLibraryOpen(!isPromptLibraryOpen);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPromptLibraryOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%", // Adjusted to take full width
      }}
    >
      <button
        style={{
          position: "absolute", // Position relative to the container
          top: "80px", // Adjust the distance from the top
          right: "180px", // Adjust the distance from the right
          backgroundColor: "#4bdb87", // Green background color
          border: "1px solid #4bdb87", // Light border
          padding: "5px 5px",
          width: "50px",
          height: "29px",
          borderRadius: "3px", // Rounded corners
          cursor: "pointer",
          fontSize: "14px",
          color: "black", // White text color
          fontWeight: "initial",
        }}
      >
        Save
      </button>
      <div
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(75vh - 20px)", // Adjust height for viewport
          overflowY: "scroll", // Enable vertical scrolling
          overflowX: "hidden",
          paddingRight: "10px", // Add padding for scrollbar clearance
        }}
      >
        {/* Data Source */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#4bdb87",
            boxShadow: "0 0 10px #4bdb87",
            padding: "30px",
            borderRadius: "8px",
            marginTop: "50px",
            marginLeft: "12px",
          }}
        >
          <div style={{ color: "black" }}>Data Source : Sales2023.pdf</div>
          <FaPaperclip
            onClick={togglePopup}
            style={{ cursor: "pointer", color: "grey" }}
          />
        </div>

        {/* Cards */}
        {["Data Cleaning", "eda", "etl"].map((card) => (
          <div
            key={card}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: "#4bdb87",
              boxShadow: "0 0 10px #4bdb87",
              padding: "30px",
              borderRadius: "8px",
              marginTop: "10px",
              color: "black",
              marginLeft: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div>{card.toUpperCase()}</div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  onClick={() => toggleButtonState(card)}
                  style={{
                    cursor: "pointer",
                    color: toggleState[card] ? "#4bdb87" : "grey",
                  }}
                >
                  {toggleState[card] ? <FaToggleOn /> : <FaToggleOff />}
                </div>
                <FaPlayCircle
                  onClick={() => togglePlayButton(card)}
                  style={{
                    cursor: "pointer",
                    color: playButtonState[card] ? "#4bdb87" : "grey",
                    marginLeft: "10px",
                  }}
                />

                <FaChevronDown
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "grey",
                  }}
                  onClick={() => toggleTextArea(card)}
                />
              </div>
            </div>

            {textAreaVisibility[card] && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <textarea
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "30px 10px 10px 10px", // Extra padding at the top for space
                    borderRadius: "8px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                  placeholder="Enter Prompt/Instructions/Schema with Instructions"
                />

                {/* Start of prompt library popup */}
                <div>
                  <button
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#4bdb87",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={handleButtonClick}
                  >
                    Prompt Library
                  </button>

                  {isPromptLibraryOpen && (
                    <>
                      {/* Overlay */}
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
                        onClick={closePopup} // Close when overlay is clicked
                      ></div>

                      {/* Popup */}
                      <div
                        style={{
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          zIndex: 1000,
                          width: "400px", // Set the width for the popup
                          height: "400px",
                          maxWidth: "90%", // Make sure it's responsive
                          maxHeight: "80%", // Limit height to avoid overflow
                          overflowY: "auto",
                        }}
                      >
                        {/* Close Button */}
                        <button
                          onClick={closePopup}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                            color: "#888",
                          }}
                        >
                          <FaTimes />
                        </button>
                        {/* PromptLibrary Component */}
                        <Promptlibrary />{" "}
                        {/* Your PromptLibrary component here */}
                      </div>
                    </>
                  )}
                </div>
                {/* End of prompt library popup */}
              </div>
            )}
          </div>
        ))}

        {/* Communicate Results */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#4bdb87",
            boxShadow: "0 0 10px #4bdb87",
            padding: "30px",
            borderRadius: "8px",
            marginTop: "10px",
            marginLeft: "12px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr", // Single column for the container
              gridTemplateRows: "auto 1fr 1fr 1fr", // 4 rows, the first for the title, the rest for the buttons
              gap: "10px", // Space between rows
              width: "100%", // Full width for the container
              padding: "30px",
              borderColor: "#4bdb87",
              boxShadow: "0 0 10px #4bdb87",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          >
            {/* Row 1: Title */}
            <div
              style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}
            >
              Communicate Results
            </div>

            {/* Row 2: First 4 buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // 4 buttons per row
                gap: "10px", // Space between buttons
              }}
            >
              {["Graph", "Code", "Table", "Diagram"].map((buttonText) => (
                <button
                  key={buttonText}
                  style={{
                    backgroundColor: "#f0f0f0", // Ash color
                    border: "1px solid #ccc", // Light border
                    padding: "5px 10px",
                    borderRadius: "15px", // Rounded corners
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {buttonText}
                </button>
              ))}
            </div>

            {/* Row 3: Next 4 buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 3fr)", // 4 buttons per row
                gap: "10px", // Space between buttons
              }}
            >
              {["Report", "Globe", "Map", "Tooltip"].map((buttonText) => (
                <button
                  key={buttonText}
                  style={{
                    backgroundColor: "#f0f0f0", // Ash color
                    border: "1px solid #ccc", // Light border
                    padding: "5px 10px",
                    borderRadius: "15px", // Rounded corners
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {buttonText}
                </button>
              ))}
            </div>

            {/* Row 4: Remaining buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // 4 buttons per row
                gap: "10px", // Space between buttons
              }}
            >
              {["Insight"].map((buttonText) => (
                <button
                  key={buttonText}
                  style={{
                    backgroundColor: "#f0f0f0", // Ash color
                    border: "1px solid #ccc", // Light border
                    padding: "5px 10px",
                    borderRadius: "15px", // Rounded corners
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {buttonText}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Viewer on the right side */}
      <div
        style={{
          width: "70%", // Adjust the width of the right side (Workflowviewer)
          paddingLeft: "20px",
          maxHeight: "calc(75vh - 20px)", // Adjust height for viewport
          overflowY: "scroll", // Enable vertical scrolling
          overflowX: "hidden",
        }}
      >
        <Workflowviewer />
      </div>
    </div>
  );
}
