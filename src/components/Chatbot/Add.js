import React, { useState } from "react";
import {
  FaFolderOpen,
  FaFolder,
  FaPlus,
  FaTachometerAlt,
  FaTrash,
} from "react-icons/fa";
import dashboard from "../../assets/icons/pngs/dashboard.png";
import widget from "../../assets/icons/pngs/widget.png";
import { useUser } from "../../context/UserContext";

const AccordionSection = ({
  title,
  items = [],
  showAddButton = false,
  setDashboardShowModal,
  showDashboardModal,
  showPopup,
  setShowPopup,
  handleDashboardClick,
  handleDeleteItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected checkbox

  const handleCheckboxChange = (itemName) => {
    // If the same checkbox is clicked again, unselect it. Otherwise, select it.
    setSelectedItem(selectedItem === itemName ? null : itemName);
    console.log(`Item selected: ${itemName}`);
  };

  // Determine icon based on title
  const getIcon = (title) => {
    if (title === "Widgets") return widget;
    if (title === "Dashboards") return dashboard;
    return null;
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div onClick={() => setIsOpen(!isOpen)} style={accordionStyle}>
          <img
            src={getIcon(title)}
            alt={title}
            style={{ width: "32px", height: "29px", marginRight: "10px" }}
          />
          <span style={titleStyle}>{title}</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaFolderOpen style={{ color: "grey" }} />
            ) : (
              <FaFolder style={{ color: "grey" }} />
            )}
          </div>
          <FaPlus
            onClick={() => {
              setShowPopup(!showPopup);
              setDashboardShowModal(!showDashboardModal);
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div style={contentStyle}>
          <div style={contentStyle}>
            {items.map((item, index) => (
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
                  onClick={() => {
                    setShowPopup(!showPopup);
                    handleDashboardClick(item);
                  }} // Handle Dashboard item click
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "grey" }}
                  onClick={() => handleDeleteItem(item, "dashboard")}
                />
              </div>
            ))}
          </div>
        </div>
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
const Add = ({
  setDashboardShowModal,
  showDashboardModal,
  showPopup,
  setShowPopup,
  handleDeleteItem,
  handleDashboardClick,
}) => {
  // Predefined items for each section
  const [reportsItems] = useState([
    { name: "Report 1" },
    { name: "Report 2" },
    { name: "Report 3" },
  ]);
  const [widgetsItems] = useState([
    { name: "Financial Widgets" },
    { name: "Sales Widgets" },
    { name: "Marketing Widgets" },
  ]);
  const { dashboardItems } = useUser();

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "40px" }}>
      {/* Main title with Add button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Add Widget to:
        </div>
        {/* Add button with added spacing */}
        <button style={{ ...addButtonStyle, marginLeft: "20px" }}>Add</button>
      </div>

      {/* Accordion Sections */}

      <AccordionSection
        title="Dashboards"
        items={dashboardItems}
        showAddButton
        setDashboardShowModal={setDashboardShowModal}
        showDashboardModal={showDashboardModal}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleDashboardClick={handleDashboardClick}
        handleDeleteItem={handleDeleteItem}
      />
      {/* <AccordionSection title="Widgets" items={widgetsItems} /> */}
    </div>
  );
};

// Inline Styles
const accordionStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  cursor: "pointer",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "16px",
};

const contentStyle = {
  paddingLeft: "20px",
};

const addButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#34eba8",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const checkboxContainerStyle = {
  position: "relative",
  display: "inline-block",
  width: "24px",
  height: "24px",
};

const checkboxInputStyle = {
  opacity: 0,
  width: 0,
  height: 0,
};

const checkmarkStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "24px",
  width: "24px",
  border: "2px solid black", // Initial border color set to black
  borderRadius: "4px", // Rounded corners
  backgroundColor: "white",
  transition: "background-color 0.3s, border-color 0.3s",
};

const checkmarkCheckedStyle = {
  backgroundColor: "#34eba8", // Background color when checked
  borderColor: "#34eba8", // Border color when checked
};

const checkmarkCheckedInnerStyle = {
  content: '""',
  position: "absolute",
  left: "6px",
  top: "4px",
  width: "8px",
  height: "12px",
  border: "solid black", // Black tick mark inside the box
  borderWidth: "0 4px 4px 0",
  transform: "rotate(45deg)",
};

export default Add;
