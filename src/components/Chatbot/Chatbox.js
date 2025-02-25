import React, { useRef, useState } from "react";
import {
  FaPlay,
  FaUndo,
  FaCaretDown,
  FaPaperclip,
  FaMicrophone,
  FaPaperPlane,
} from "react-icons/fa";
import Chatcontent from "./Chatcontent"; // Import the Chatcontent component
import Selecteddatasource from "./Selecteddatasource"; // Import the Selecteddatasource component
import Promtlibrary from "../Promptlibrary"; // Import the Promtlibrary component
import DataSourceModel from "../DataSourceModel";

const Chatbox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPromptPopupOpen, setIsPromptPopupOpen] = useState(false); // State for Prompt popup
  const [width, setWidth] = useState(550); // Initial width of the Chatbox
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const textDivRef = useRef(null);
  // const [isRecording, setIsRecording] = useState(false);
  // const [transcript, setTranscript] = useState("");
  // const recognitionRef = useRef(null);

  // const handleMicrophoneClick = () => {
  //   if (
  //     ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  //   ) {
  //     alert("Speech recognition is not supported in this browser.");
  //     return;
  //   }

  //   // Check if SpeechRecognition instance exists
  //   if (!recognitionRef.current) {
  //     const SpeechRecognition =
  //       window.SpeechRecognition || window.webkitSpeechRecognition;
  //     const recognition = new SpeechRecognition();
  //     recognition.lang = "en-US"; // Set language for recognition
  //     recognition.continuous = false; // Stop listening automatically
  //     recognition.interimResults = false; // Don't show intermediate results

  //     // Event listeners for recognition
  //     recognition.onstart = () => setIsRecording(true);
  //     recognition.onresult = (event) => {
  //       const transcriptResult = event.results[0][0].transcript;
  //       setTranscript(transcriptResult); // Set the recognized text
  //     };
  //     recognition.onerror = (event) =>
  //       console.error("Error in recognition:", event.error);
  //     recognition.onend = () => setIsRecording(false);

  //     recognitionRef.current = recognition;
  //   }

  //   // Start or stop recognition based on the state
  //   if (isRecording) {
  //     recognitionRef.current.stop();
  //   } else {
  //     recognitionRef.current.start();
  //   }
  // };

  const handlePaperclipClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePromptClick = () => {
    setIsPromptPopupOpen(true);
  };

  const handleClosePromptPopup = () => {
    setIsPromptPopupOpen(false);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsResizing(true);
      setStartX(e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const newWidth = width - deltaX;

      if (newWidth > 200 && newWidth <= 600) {
        setWidth(newWidth); // Update width
        setStartX(e.clientX); // Update start position
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false); // Stop resizing
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]); // Only attach/remove listeners when resizing state changes

  const handleTextToSpeech = () => {
    if (textDivRef.current) {
      const text = textDivRef.current.innerText; // Get the text content
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US"; // Set the language
      speech.pitch = 1; // Set pitch (0 to 2, default is 1)
      speech.rate = 1; // Set rate (0.1 to 10, default is 1)
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="container" style={{ width: `${width}px` }}>
      <div className="drag-handle" onMouseDown={handleMouseDown} />
      <div className="header">
        {/* <button className="button" onClick={handlePromptClick}>
          Prompt: Need Analysis <FaCaretDown style={styles.icon} />
        </button> */}
        <button className="buttonsave">Save</button>
        {/* <FaPlay onClick={handleTextToSpeech} className="icon" /> */}
        <FaUndo className="icon" />
      </div>

      <div className="content" />
      {/* <div>
        <h3>Recognized Text:</h3>
        <input
          type="text"
          value={transcript}
          readOnly
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />
      </div> */}

      {/* Recording Status */}
      {/* {isRecording && <p>Listening...</p>} */}
      <Chatcontent chatTextToSpeech={textDivRef} />
      <Selecteddatasource />
      <div className="footer">
        <div className="input-container">
          <FaPaperclip
            className="paperclip-icon"
            onClick={handlePaperclipClick}
          />
          <input
            type="text"
            className="input"
            placeholder="Type a message..."
          />
          <div className="actions">
            <FaPaperPlane className="action-icon" />
            <FaMicrophone
              className="action-icon"
              // onClick={handleMicrophoneClick}
              // style={{
              //   cursor: "pointer",
              //   fontSize: "24px",
              //   color: isRecording ? "red" : "black",
              // }}
            />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>
              Close
            </button>
            <DataSourceModel />
          </div>
        </div>
      )}

      {isPromptPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePromptPopup}>
              Close
            </button>
            <Promtlibrary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;

const styles = `
.container {
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.drag-handle {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 50px;
  background-color: #ccc;
  cursor: ew-resize;
}


.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.button {
  background: white;
  border: 1px solid grey;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  color: grey;
}

.buttonsave {
  background-color: #34eba8;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  color: black;
  font-weight: 540;
}

.icon {
  font-size: 20px;
  color: #999;
  margin-left: 2px;
}

.content {
  flex: 1;
}

.footer {
  margin-top: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 10px;
  position: relative;
  border: 2px solid #34eba8;
}

.paperclip-icon {
  position: absolute;
  left: 10px;
  color: #999;
  font-size: 20px;
  cursor: pointer;
}

.input {
  flex: 1;
  border: none;
  padding: 10px 10px 10px 60px;
  border-radius: 20px;
  background-color: transparent;
  outline: none;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}

.action-icon {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  margin: 5px 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
padding:40px;
  border-radius: 10px;
  position: relative;
  width: 800px;
  height: 700px;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
