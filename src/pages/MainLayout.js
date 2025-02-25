import React, { useEffect, useState } from "react";
import MainContent from "../components/Mainviewer/MainContent";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chatbox from "../components/Chatbot/Chatbox";
import axios from "axios";
import { useUser } from "../context/UserContext";
import useGetDdData from "../hooks/useGetDbData";
import useGetConnectionData from "../hooks/useGetConnectionData";
import useGetFIlesAndFolders from "../hooks/useGetFIlesAndFolders";
import { Button } from "@mui/material";

import DynamicTable from "../components/Table-Modal/DynamicTable";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { DashBoardMainLayout } from "../components/DashBoardMainLayout";
import FilePreview from "../components/Mainviewer/FilePreview";
import DocumentViewer from "../components/UnstructurePreview/DoumentViewer";
import Dashboard from "../components/Dashboard/Dashboard";
import SharedDashboard from "../components/Dashboard/SharedDashboard";
const MainLayout = () => {
  const { user, structuredFileToogle } = useUser();
  useGetDdData();
  useGetConnectionData();
  useGetFIlesAndFolders();
  const { access_token, token_type } = user;

  // Sidebar width state
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial width of 250px
  const [isResizing, setIsResizing] = useState(false);

  // Modal visibility state
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.location.pathname !== "/") {
  //     navigate("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://v2back.smartcardai.com/home",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );
  //     } catch (error) {}
  //   };
  //   getData();
  // }, [access_token, token_type]);

  // Handle mouse movement during resizing
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.max(200, e.clientX); // Minimum width of 200px
      setSidebarWidth(newWidth);
    }
  };

  // Stop resizing on mouse up
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
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
  }, [isResizing]);

  const styles = {
    spanLine: {
      display: "inline-block",
      marginLeft: "10px",
      width: "10px",
      height: "10px",
      borderRadius: "50%", // Makes it a small circle
      backgroundColor: "green", // Change this to "red" or other colors for offline
    },
    localButton: {
      background: "linear-gradient(to right, #34eba8, #f0f05d)",
      color: "#585e5b",
      border: "none",
      padding: "8px 16px",
      fontSize: "0.875rem",
      margin: "0px 20px",
      cursor: "pointer",
      borderRadius: "25px",
      fontWeight: "bold",
    },
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };
  const location = useLocation();
  const isSharedDashboard = location.pathname.startsWith("/shared-dashboard");

  return (
    <>
      <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        overflow-y: hidden;
        height: 100%;
      }

      .app-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background-color: white;
        color: black;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

  .content-container {
    display: flex;
    flex-grow: 1;
       position:relative;
    overflow: hidden; /* Prevent scrollbars in the content */
  }

      .sidebar {
        display: flex;
        flex-shrink: 0;
        background-color: #f4f4f4;
        height: 100%;
        min-width: 270px;
      }

.resize-handle {
  width: 1px; 
  cursor: ew-resize;
  display: flex;

  align-items: center;
  justify-content: center;
  position: relative;  
}

.resize-handle::after {
  content: "";
  width: 10px;  
  height: 50px;  
  background-color: #ccc;  
  display: block;
  position: absolute;
  left: -6px; 
  top: 50%;  
  transform: translateY(-50%);
}

.main-content {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}


      /* Welcome Modal Styles */
      .welcome-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001; /* Higher than overlay */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }

      .welcome-modal.hidden {
        opacity: 0;
        pointer-events: none;
      }

      .welcome-modal h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 10px;
      }

      .welcome-modal button {
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .welcome-modal button:hover {
        background-color: #45a049;
      }

      .welcome-modal button:focus {
        outline: none;
      }

      /* Background Overlay */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* 50% opacity black */
        z-index: 1000; /* Below modal */
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }

      .modal-overlay.hidden {
        opacity: 0;
        pointer-events: none;
      }
    `}</style>

      <div className="app-container">
        {/* <Navbar /> */}
        <div className="content-container">
          {!isSharedDashboard && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}

          {/* <div
            className="resize-handle"
            onMouseDown={() => setIsResizing(true)}
          ></div> */}

          <div className="main-content">
            <Routes>
              {/* <Route path="/" element={<MainContent />} /> */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard/:user/:name" element={<Dashboard />} />
              <Route
                path="/shared-dashboard/:user/:name"
                element={<SharedDashboard />}
              />

              <Route path="/file-preview" element={<FilePreview />} />
              <Route
                path="/document-viewer"
                element={
                  <DocumentViewer fileName="sample.pdf" folderName="aasd" />
                }
              />
              <Route path="/table" element={<DynamicTable />} />
            </Routes>
          </div>
          {/* <Chatbox /> */}
        </div>
      </div>

      {/* Welcome Modal and Overlay */}
      {/* {showWelcomeModal && (
        <>
          <div
            className={`modal-overlay ${showWelcomeModal ? "" : "hidden"}`}
            onClick={handleCloseModal} // Close modal on clicking outside
          ></div>
          <div className={`welcome-modal ${showWelcomeModal ? "" : "hidden"}`}>
            <div>
              <button style={styles.localButton}>Update /Download Local</button>
              <Link to="/dashboard/e3615378-a223-4552-b247-e6d6aa35ea89">
                <button style={styles.localButton} onClick={handleCloseModal}>
                  Connect Local
                  <span style={styles.spanLine}></span>
                </button>
              </Link>
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default MainLayout;
