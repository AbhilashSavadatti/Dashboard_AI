import React, { useEffect, useState } from "react";
import {
  FaFolderOpen,
  FaFolder,
  FaTimes,
  FaTachometerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import Dashboard from "./Dashboard/Dashboard";
import Thread from "./Threads/Thread";
import Widget from "./Widge/Widget";
import Workflow from "./Workflow/Workflow"; // Import Workflow component
import dashboard from "../assets/icons/pngs/dashboard.png";
import thread from "../assets/icons/pngs/thread.png";
import widget from "../assets/icons/pngs/widget.png";
import ETL from "../assets/icons/pngs/automation.png";
import { Pen, Pencil } from "lucide-react";
import { useUser } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const { dashboardItems, setDashboardItems } = useUser();
  const [showResults, setShowResults] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showEDA, setShowEDA] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showWidget, setShowWidget] = useState(false);
  const [showETL, setShowETL] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const [showPodcast, setShowPodcast] = useState(false);

  const [reportItems, setReportItems] = useState([]);
  const [analysisItems, setAnalysisItems] = useState([]);
  const [EDAItems, setEDAItems] = useState([]);
  const [widgetItems, setWidgetItems] = useState([]);
  const [ETLItems, setETLItems] = useState([]);
  const [threadItems, setThreadItems] = useState([]);
  const [podcastItems, setPodcastItems] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [newEditedItem, setNewEditedItem] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWidgetModal, setWidgetShowModal] = useState(false);
  const [showDashboardModal, setDashboardShowModal] = useState(false);
  const [editDashboardModal, setEditDashboardShowModal] = useState(false);
  const [showReportModal, setReportShowModal] = useState(false);
  const [showETLModal, setETLShowModal] = useState(false);
  const [showEDAModal, setShowEDAModal] = useState(false);
  const [showThreadModal, setThreadShowModal] = useState(false);
  const [showPodcastModal, setPodcastShowModal] = useState(false);

  const [currentReportItem, setCurrentReportItem] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const [currentDashboardItem, setCurrentDashboardItem] = useState();
  const [showDashboardPopup, setShowDashboardPopup] = useState(true);

  const [currentEDAItem, setCurrentEDAItem] = useState(null); // Tracks selected Workflow item
  const [showEDAPopup, setShowEDAPopup] = useState(false); // Toggles the Workflow popup
  const [currentItem, setCurrentItem] = useState("");
  const [currentWidgetItem, setCurrentWidgetItem] = useState(null);
  const [showWidgetPopup, setShowWidgetPopup] = useState(false);

  const [currentETLItem, setCurrentETLItem] = useState(null);
  const [showETLPopup, setShowETLPopup] = useState(false);

  const [currentThreadItem, setCurrentThreadItem] = useState(null);
  const [showThreadPopup, setShowThreadPopup] = useState(false);

  const [currentPodcastItem, setCurrentPodcastItem] = useState(null);
  const [showPodcastPopup, setShowPodcastPopup] = useState(false);
  const [currentSubscriptionItem, setCurrentSubscriptionItem] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const user_name = "user3";

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await axios.get(
          "https://v3-tjof.onrender.com/api/dashboards",
          {
            params: { username: user_name },
          }
        );

        if (response.data.success) {
          setDashboardItems(response.data.dashboards);
        }
      } catch (err) {
        console.error(err); // Log the error details
      }
    };

    if (user_name) {
      fetchDashboards();
    }
  }, [user_name, dashboardItems]); // Re-fetch if user_name changes

  // useEffect(() => {
  //   if (showDashboard && dashboardItems.length > 0) {
  //     handleDashboardClick(dashboardItems[0].dashboard_id);
  //   }
  // }, [showDashboard, dashboardItems, handleDashboardClick]);

  const navigate = useNavigate();

  const handleAddItem = () => {
    if (newItem.trim()) {
      switch (currentSection) {
        case "report":
          setReportItems([...reportItems, newItem]);
          break;
        case "EDA":
          setEDAItems([...EDAItems, newItem]);
          break;
        // case "dashboard":
        //   setDashboardItems([...dashboardItems, newItem]);
        //   break;
        case "widget":
          setWidgetItems([...widgetItems, newItem]);
          break;
        case "ETL":
          setETLItems([...ETLItems, newItem]);
          break;
        case "thread":
          setThreadItems([...threadItems, newItem]);
          break;
        case "podcast":
          setPodcastItems([...podcastItems, newItem]);
          break;
        default:
          break;
      }
      setNewItem("");
      setShowModal(false);
      setWidgetShowModal(false);
      setDashboardShowModal(false);
      setETLShowModal(false);
      setShowEDAModal(false);
      setReportShowModal(false);
      setThreadShowModal(false);
      setPodcastShowModal(false);
    }
  };

  const handleEditDashboardItem = async (folderId, updatedFolderName) => {
    try {
      const formData = new FormData();
      formData.append("dashboard_id", folderId);
      formData.append("dashboard_name", updatedFolderName);

      const response = await fetch(`https://v3-tjof.onrender.com/api/dashboards`, {
        method: "PUT",
        body: formData, // Send form data
      });

      const data = await response.json();
      if (data.success) {
        console.log("Folder updated successfully", data);
        setEditDashboardShowModal(false); // Close the modal
      } else {
        console.log("Error updating folder", data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteDashboardItem = async (folderId) => {
    try {
      const formData = new FormData();
      formData.append("dashboard_id", folderId);

      const response = await fetch("https://v3-tjof.onrender.com/api/dashboards", {
        method: "DELETE",
        body: formData, // Send form data
      });

      const data = await response.json();
      if (data.success) {
        console.log("Folder deleted successfully", data);
        // Update state or refresh the list of folders
      } else {
        console.log("Error deleting folder", data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Handle adding a new dashboard
  // Handle adding a new dashboard
  const handleAddDashboardItem = async () => {
    if (!newItem.trim()) {
      alert("Please enter a valid dashboard name.");
      return;
    }

    try {
      // Send POST request to create the new dashboard
      const formData = new FormData();
      formData.append("username", user_name);
      formData.append("dashboard_name", newItem);

      // Send POST request to create the new dashboard
      const response = await fetch("https://v3-tjof.onrender.com/api/dashboards", {
        method: "POST",
        body: formData, // Send form data
      });

      const data = await response.json();
      if (data.success) {
        console.log("Dashboard created successfully:", data);
        // Add the new dashboard to the state
        setDashboardItems((prevItems) => [
          ...prevItems,
          { folder_id: data.folder_id, folder_name: data.folder_name },
        ]);
        setDashboardShowModal(false); // Close the modal
        setNewItem(""); // Clear the input field
      } else {
        console.log("Error creating dashboard:", data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const openEditModal = (item, section) => {
    setCurrentSection(section);
    setCurrentItem(item.dashboard_id); // Store the item being edited
    setNewEditedItem(item.dashboard_name); // Initialize with the current item value
    setShowModal(true);

    switch (section) {
      case "dashboard":
        setEditDashboardShowModal(true);
        break;
      // Add cases for other sections if necessary
      default:
        break;
    }
  };

  const handleDeleteItem = (item, section) => {
    switch (section) {
      case "report":
        setReportItems(reportItems.filter((i) => i !== item));
        break;
      case "EDA":
        setEDAItems(EDAItems.filter((i) => i !== item));
        break;
      case "dashboard":
        setDashboardItems(dashboardItems.filter((i) => i !== item));
        localStorage.removeItem(`dashboard-${item}`);
        break;
      case "widget":
        setWidgetItems(widgetItems.filter((i) => i !== item));
        break;
      case "ETL":
        setETLItems(ETLItems.filter((i) => i !== item));
        break;
      case "thread":
        setThreadItems(threadItems.filter((i) => i !== item));
        break;
      case "podcast":
        setPodcastItems(podcastItems.filter((i) => i !== item));
        break;
      default:
        break;
    }
    navigate("/");
  };

  const openDashboardModal = async (section) => {
    setCurrentSection(section);

    if (section === "dashboard") {
      const response = await axios.get(
        "https://v3-tjof.onrender.com/api/checkDashboardCount",
        {
          params: { username: user_name },
        }
      );
      const data = response.data;

      if (data.dashboardCount >= data.numberOfDashboards) {
        setShowSubscriptionModal(true); // Show the subscription modal
      } else {
        setDashboardShowModal(true); // Show the dashboard modal
      }
    }

    setShowModal(true);
  };


  const handleSubscribe = () => {
    window.location.href = "https://smartcardai.vercel.app/pricing";
  };

  const handleDashboardClick = (item) => {
    console.log(item);
    setCurrentDashboardItem(item);
    setShowDashboardPopup(true);
    navigate(`/dashboard/${user_name}/${item}`); // Use underscore between UUID and item
  };

  const handleReportClick = (item) => {
    setCurrentReportItem(item);
    setShowReportPopup(true);
  };

  const handleEDAClick = (item) => {
    setCurrentEDAItem(item);
    setShowEDAPopup(true);
  };

  const handleWidgetClick = (item) => {
    setCurrentWidgetItem(item);
    setShowWidgetPopup(true);
  };

  const handleETLClick = (item) => {
    setCurrentETLItem(item);
    setShowETLPopup(true);
  };

  const handleThreadClick = (item) => {
    setCurrentThreadItem(item);
    setShowThreadPopup(true);
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "40px" }}>
      {/* Threads Accordion */}

      {/* <div onClick={() => setShowThread(!showThread)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={thread}
            alt="Thread Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>THREADS</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showThread} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("thread");
            }}
          />
        </div>
      </div>
      {showThread && (
        <div style={contentStyle}>
          {threadItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handleThreadClick(item)} // Handle Thread item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "thread")}
              />
            </div>
          ))}
        </div>
      )} */}

      {/* Modal for Adding New Item */}
      {/* {showThreadModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New Thread</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter Thread Name"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input />
            <button onClick={handleAddItem}>Save</button>
            <button
              onClick={() => setThreadShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      {showSubscriptionModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              Upgrade Required
            </h2>
            <p style={{ marginTop: "10px", color: "#4B5563" }}>
              You need a subscription to access this feature.
            </p>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                style={cancelButtonStyle}
                onClick={() => setShowSubscriptionModal(false)}
              >
                Cancel
              </button>
              <button style={subscribeButtonStyle} onClick={handleSubscribe}>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Threads Popup */}
      {/* {showThreadPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStylethread}>
            <h3>Thread: {currentThreadItem}</h3>
            <Thread />

          
            <button
              onClick={() => setShowThreadPopup(false)}
              style={{
                position: "absolute", // Position relative to the container
                top: "20px", // Adjust the distance from the top
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
              <FaTimes />
            </button>
          </div>
        </div>
      )} */}

      {/* Podcast Accordion */}
      {/* 
      <div onClick={() => setShowPodcast(!showPodcast)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={podcast}
            alt="Podcast Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>PODCAST</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showPodcast} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("podcast");
            }}
          />
        </div>
      </div>
      {showPodcast && (
        <div style={contentStyle}>
          {podcastItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handlePodcastClick(item)} // Handle Dashboard item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "podcast")}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding New Item */}
      {/* {showPodcastModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New Podcast</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter Podcast Name"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddItem}>Save</button>
          </div>
        </div>
      )}

      {/* Podcast Popup */}
      {/* {showPodcastPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStylepodcast}>
            <h3>Podcast: {currentPodcastItem}</h3>
            <Podviewer />

            {/* Close Button */}
      {/* <button
              onClick={() => setShowPodcastPopup(false)}
              style={{
                position: "absolute", // Position relative to the container
                top: "20px", // Adjust the distance from the top
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
              <FaTimes />
            </button>
          </div>
        </div>
      )}
*/}

      {/* Reports Accordion 

      <div onClick={() => setShowReports(!showReports)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={reports}
            alt="Reports Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>REPORTS</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showReports} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("report");
            }}
          />
        </div>
      </div>
      {showReports && (
        <div style={contentStyle}>
          {reportItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handleReportClick(item)} // Handle Dashboard item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "report")}
              />
            </div>
          ))}
        </div>
      )}

       Modal for Adding New Item 
      {showReportModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New Report</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter Report Name"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddItem}>Save</button>
            <button
              onClick={() => setReportShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      Reports Popup 
      {showReportPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStylereport}>
            <h3>Report: {currentReportItem}</h3>
            <Docxeditor />

            Close Button 
            <button
              onClick={() => setShowReportPopup(false)}
              style={{
                position: "absolute", // Position relative to the container
                top: "20px", // Adjust the distance from the top
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
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      Workflow Accordion 
      <div onClick={() => setShowEDA(!showEDA)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={workflow}
            alt="Workflow Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <span style={titleStyle}>EDA</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showEDA} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("EDA");
            }}
          />
        </div>
      </div>
      {showEDA && (
        <div style={contentStyle}>
          {EDAItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handleEDAClick(item)} // Handle ETL item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "EDA")}
              />
            </div>
          ))}
        </div>
      )}

     Modal for Adding Workflow  New Item 
      {showEDAModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New EDA</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter EDA Title"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddItem}>Save</button>
            <button
              onClick={() => setShowEDAModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      Workflow Popup 
      {showEDAPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStyleworkflow}>
            <h3>EDA: {currentEDAItem}</h3>
            <Workflow />

             Close Button 
            <button
              onClick={() => setShowEDAPopup(false)}
              style={{
                position: "absolute", // Position relative to the container
                top: "20px", // Adjust the distance from the top
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
              <FaTimes />
            </button>
          </div>
        </div>
      )} */}

      {/* ETL Accordion */}
      {/* <div onClick={() => setShowETL(!showETL)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={ETL}
            alt="ETL Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>ETL</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showETL} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("ETL");
            }}
          />
        </div>
      </div> */}
      {showETL && (
        <div style={contentStyle}>
          {ETLItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handleETLClick(item)} // Handle ETL item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "ETL")}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding Widget  New Item */}
      {showETLModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New ETL</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter ETL Title"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddItem}>Save</button>
            <button
              onClick={() => setWidgetShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ETL Popup */}
      {showETLPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStyleETL}>
            <h3>Widget: {currentETLItem}</h3>
            <Workflow />
            <button
              onClick={() => setShowETLPopup(false)}
              style={{ marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Accordion */}
      <div
        onClick={() => setShowDashboard(!showDashboard)}
        style={accordionStyle}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={dashboard}
            alt="Dashboard Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>DASHBOARDS</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showDashboard} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openDashboardModal("dashboard");
            }}
          />
        </div>
      </div>
      {showDashboard && (
        <div style={contentStyle}>
          {dashboardItems.map((item) => (
            <div
              key={item.dashboard_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <AccordionItem
                  icon={<FaTachometerAlt style={{ color: "grey" }} />}
                  text={item.dashboard_name}
                  onClick={() => handleDashboardClick(item.dashboard_id)} // Handle Dashboard item click
                />
              </div>
              <div>
                <Pencil
                  onClick={() => openEditModal(item, "dashboard")}
                  size={18}
                  style={{
                    cursor: "pointer",
                    color: "grey",

                    transform: "translate(-6px, 0)", // Fix transform if you want to move it slightly
                  }}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "grey" }}
                  onClick={() => handleDeleteDashboardItem(item.dashboard_id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding New Item */}
      {showDashboardModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h4>Dashboard name</h4>
            {/* <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter Dashboard Name"
              style={{ width: "100%" }}
            /> */}
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder=""
              style={{
                width: "100%",
                padding: "10px",
                marginBlock: "10px",
                borderRadius: "15px",
              }}
            />
            <button
              style={{
                backgroundColor: "#34eba8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
              onClick={handleAddDashboardItem}
            >
              Save
            </button>
            <button
              onClick={() => setDashboardShowModal(false)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#34eba8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {editDashboardModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Edit Dashboard</h3>
            <textarea
              rows="4"
              value={newEditedItem}
              onChange={(e) => setNewEditedItem(e.target.value)}
              placeholder="Enter Dashboard Name"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
              onClick={() =>
                handleEditDashboardItem(currentItem, newEditedItem)
              } // Pass correct parameters
            >
              Edit
            </button>
            <button
              onClick={() => setEditDashboardShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Widget Accordion */}
      {/* <div onClick={() => setShowWidget(!showWidget)} style={accordionStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={widget}
            alt="Widget Icon"
            style={{ width: "29px", height: "24px" }}
          />
          <span style={titleStyle}>WIDGETS</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <IconToggle isOpen={showWidget} />
          <FaPlus
            style={{
              fontSize: "16px",
              marginLeft: "10px",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openModal("widget");
            }}
          />
        </div>
      </div> */}
      {showWidget && (
        <div style={contentStyle}>
          {widgetItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AccordionItem
                icon={<FaTachometerAlt style={{ color: "grey" }} />}
                text={item}
                onClick={() => handleWidgetClick(item)} // Handle Dashboard item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "widget")}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding New Item */}
      {showWidgetModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>New Widget Collection</h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter Collection Title"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddItem}>Save</button>
            <button
              onClick={() => setWidgetShowModal(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Widget Popup */}
      {showWidgetPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStylewidget}>
            <h3>Collection: {currentWidgetItem}</h3>
            <Widget />

            {/* Close Button */}
            <button
              onClick={() => setShowWidgetPopup(false)}
              style={{
                position: "absolute", // Position relative to the container
                top: "20px", // Adjust the distance from the top
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
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components and Styles
const AccordionItem = ({ icon, text, onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </div>
);

const IconToggle = ({ isOpen }) =>
  isOpen ? (
    <FaFolderOpen style={{ fontSize: "16px", color: "grey" }} />
  ) : (
    <FaFolder style={{ fontSize: "16px", color: "grey" }} />
  );

const accordionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px",

  borderRadius: "5px",
  marginBottom: "2px",
  cursor: "pointer",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "16px",
  color: "#333",
};

const contentStyle = {
  padding: "10px",

  borderRadius: "5px",
  marginTop: "1px",
};

const modalOverlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
};

const modalStyledashboard = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "630px",
};

const modalStylewidget = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "630px",
};

const modalStyleETL = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "600px",
};

const modalStyleworkflow = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "600px",
};

const modalStylereport = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "650px",
};

const modalStylethread = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "600px",
};

const modalStylepodcast = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "1200px",
  height: "650px",
};

const buttonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  margin: "10px",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#E5E7EB",
  color: "#374151",
};

const subscribeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#16A34A",
  color: "white",
};

export default Sidebar;
