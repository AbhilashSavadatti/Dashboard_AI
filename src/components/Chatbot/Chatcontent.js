import React, { useState } from "react";
import { FaPlay, FaPlus, FaTimes } from "react-icons/fa";
import logo from "../../assets/icons/pngs/logo.png";
import Add from "./Add";
import Tableviewer from "../Viewers/Jsonviewers/Tableviewer";
import Graphviewer from "../Viewers/Jsonviewers/Graphviewer";
import Mapviewer from "../Viewers/Jsonviewers/Mapviewer";
import { useUser } from "../../context/UserContext";
import dashboard from "../../assets/icons/pngs/dashboard.png";
import {
  FaFolderOpen,
  FaFolder,
  FaTachometerAlt,
  FaTrash,
} from "react-icons/fa";
import Dashboard from "../Dashboard/Dashboard";
const Chatcontent = ({ chatTextToSpeech }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { dashboardItems, setDashboardItems } = useUser();
  const [showResults, setShowResults] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showEDA, setShowEDA] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
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
  const [currentSection, setCurrentSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWidgetModal, setWidgetShowModal] = useState(false);
  const [showDashboardModal, setDashboardShowModal] = useState(false);
  const [showReportModal, setReportShowModal] = useState(false);
  const [showETLModal, setETLShowModal] = useState(false);
  const [showEDAModal, setShowEDAModal] = useState(false);
  const [showThreadModal, setThreadShowModal] = useState(false);
  const [showPodcastModal, setPodcastShowModal] = useState(false);

  const [currentReportItem, setCurrentReportItem] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const [currentDashboardItem, setCurrentDashboardItem] = useState(null);
  const [showDashboardPopup, setShowDashboardPopup] = useState(false);

  const [currentEDAItem, setCurrentEDAItem] = useState(null); // Tracks selected Workflow item
  const [showEDAPopup, setShowEDAPopup] = useState(false); // Toggles the Workflow popup

  const [currentWidgetItem, setCurrentWidgetItem] = useState(null);
  const [showWidgetPopup, setShowWidgetPopup] = useState(false);

  const [currentETLItem, setCurrentETLItem] = useState(null);
  const [showETLPopup, setShowETLPopup] = useState(false);

  const [currentThreadItem, setCurrentThreadItem] = useState(null);
  const [showThreadPopup, setShowThreadPopup] = useState(false);

  const [currentPodcastItem, setCurrentPodcastItem] = useState(null);
  const [showPodcastPopup, setShowPodcastPopup] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim()) {
      switch ("dashboard") {
        case "report":
          setReportItems([...reportItems, newItem]);
          break;
        case "EDA":
          setEDAItems([...EDAItems, newItem]);
          break;
        case "dashboard":
          setDashboardItems([...dashboardItems, newItem]);
          break;
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
  };

  const openModal = (section) => {
    setCurrentSection(section);
    setShowModal(true);

    if (section === "dashboard") {
      setDashboardShowModal(true);
    } else if (section === "widget") {
      setWidgetShowModal(true);
    } else if (section === "report") {
      setReportShowModal(true);
    } else if (section === "ETL") {
      setETLShowModal(true);
    } else if (section === "EDA") {
      setShowEDAModal(true);
    } else if (section === "thread") {
      setThreadShowModal(true);
    } else if (section === "podcast") {
      setPodcastShowModal(true);
    }
  };

  const handleDashboardClick = (item) => {
    setCurrentDashboardItem(item);
    setShowDashboardPopup(true);
  };
  const messages = [
    { sender: "SmartCard AI", text: "Hello! How can I assist you today?" },
    {
      sender: "user",
      text: "Can you help me to create table with Year, Category, Product and Rate ? ",
    },
    { sender: "SmartCard AI", text: "Sure! Here is your table " },
    {
      sender: "user",
      text: "Could you plot me a graph between Sales on X axis and Years on Y axis?",
    },
    { sender: "SmartCard AI", text: "Sure! Here is your graph " },
    {
      sender: "user",
      text: "Could you give me insights about what is the peak sales?",
    },
    { sender: "SmartCard AI", text: "Peak sales is 65000 in 2017 " },
    {
      sender: "user",
      text: "Could you show me in a map which location and sales ",
    },
    {
      sender: "SmartCard AI",
      text: "Here is the heat map that with locations and sales",
    },
    { sender: "user", text: "Could you show me peak voltage in a globe" },
    {
      sender: "SmartCard AI",
      text: "Here is the globe of regions around the globe with peak voltage ",
    },
  ];

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={styles.container}>
      <p ref={chatTextToSpeech}>hello this is new text</p>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            background:
              msg.sender === "SmartCard AI"
                ? "#f3f7f2"
                : "linear-gradient(160deg, rgba(240, 240, 93, 0.1), rgba(240, 240, 93, 0.6))",
            alignSelf:
              msg.sender === "SmartCard AI" ? "flex-end" : "flex-start", // Right for AI, Left for User
          }}
        >
          {msg.sender === "SmartCard AI" && index !== 0 && (
            <>
              <button
                style={{
                  backgroundColor: "#34eba8", // Green color for button
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  margin: "10px",
                }}
              >
                <FaPlus style={{ color: "#0c0c0c" }} onClick={handleAddClick} />

                <span style={{ color: "#0c0c0c" }}>Dashboard</span>
              </button>
              {/* <FaPlay style={styles.icon} /> */}
            </>
          )}
          <div style={styles.textContainer}>
            <p
              style={
                msg.sender === "SmartCard AI" ? styles.textAI : styles.text
              }
            >
              {msg.sender === "SmartCard AI" && (
                <img
                  src={logo}
                  alt="logo Icon"
                  style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
              )}
              {msg.text}
            </p>
            {msg.text === "Sure! Here is your table " && <Tableviewer />}
            {msg.text === "Sure! Here is your graph " && <Graphviewer />}
            {msg.text ===
              "Here is the heat map that with locations and sales" && (
              <Mapviewer />
            )}
          </div>
        </div>
      ))}
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
              openModal("dashboard");
            }}
          />
        </div>
      </div>
      {showDashboard && (
        <div style={contentStyle}>
          {dashboardItems.map((item, index) => (
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
                onClick={() => handleDashboardClick(item)} // Handle Dashboard item click
              />
              <FaTrash
                style={{ cursor: "pointer", color: "grey" }}
                onClick={() => handleDeleteItem(item, "dashboard")}
              />
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
              onClick={() => {
                setShowPopup(!showPopup);
                handleAddItem("dashboard");
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowPopup(!showPopup);
                setDashboardShowModal(false);
              }}
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

      {/* Dashboard Popup */}
      {showDashboardPopup && (
        <div style={modalOverlayStyle}>
          <div style={modalStyledashboard}>
            <h3>Dashboard: {currentDashboardItem}</h3>
            <Dashboard />

            {/* Close Button */}
            <button
              onClick={() => setShowDashboardPopup(false)}
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

      {showPopup && (
        <>
          <div style={styles.overlay} onClick={handleClosePopup}></div>
          <div style={styles.popup}>
            <button
              style={styles.closeButton}
              onClick={() => {
                handleClosePopup();
              }}
            >
              <FaTimes />
            </button>
            <Add
              showDashboardModal={showDashboardModal}
              setDashboardShowModal={setDashboardShowModal}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              handleDashboardClick={handleDashboardClick}
              handleDeleteItem={handleDeleteItem}
            />
          </div>
        </>
      )}
    </div>
  );
};
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "2340px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    height: "500px",
    overflowY: "auto",
    paddingRight: "10px",
  },
  card: {
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "fit-content", // Adjust width based on content
    maxWidth: "100%", // Prevent overflow on larger content
    position: "relative",
    wordWrap: "break-word", // Ensure long text breaks appropriately
  },

  textContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textAI: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
    display: "flex",
    alignItems: "center",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#333",
    display: "flex",
    alignItems: "center",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    fontSize: "16px",
    color: "#333",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    color: "#333",
    cursor: "pointer",
  },
};

export default Chatcontent;
