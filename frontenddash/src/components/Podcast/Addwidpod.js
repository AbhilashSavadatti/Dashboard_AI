import React, { useState } from "react";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import dashboard from "../../assets/icons/pngs/dashboard.png";
import widget from "../../assets/icons/pngs/widget.png";

const AccordionSection = ({ title, items = [], showAddButton = false }) => {
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
    <div style={{ position: "relative" }}>
      <div onClick={() => setIsOpen(!isOpen)} style={accordionStyle}>
        <img
          src={getIcon(title)}
          alt={title}
          style={{ width: "32px", height: "29px", marginRight: "10px" }}
        />
        <span style={titleStyle}>{title}</span>
        <div>
          {isOpen ? (
            <FaFolderOpen style={{ color: "grey" }} />
          ) : (
            <FaFolder style={{ color: "grey" }} />
          )}
        </div>
      </div>
      {isOpen && (
        <div style={contentStyle}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Item text */}
                  <div>{item.name}</div>
                  {/* Custom checkbox */}
                  <label style={checkboxContainerStyle}>
                    <input
                      type="checkbox"
                      checked={selectedItem === item.name} // Only check if selected
                      onChange={() => handleCheckboxChange(item.name)} // Handle click
                      style={checkboxInputStyle}
                    />
                    <span
                      style={{
                        ...checkmarkStyle,
                        ...(selectedItem === item.name
                          ? checkmarkCheckedStyle
                          : {}),
                      }}
                    >
                      {selectedItem === item.name && (
                        <span style={checkmarkCheckedInnerStyle}></span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div>No items available</div>
          )}
        </div>
      )}
    </div>
  );
};

const Addwid = () => {
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
  const [dashboardsItems] = useState([
    { name: "Dashboard 1" },
    { name: "Dashboard 2" },
    { name: "Dashboard 3" },
  ]);

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
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Select:</div>
        {/* Add button with added spacing */}
        <button style={{ ...addButtonStyle, marginLeft: "20px" }}>Add</button>
      </div>

      {/* Accordion Sections */}

      <AccordionSection
        title="Dashboards"
        items={dashboardsItems}
        showAddButton
      />
      <AccordionSection title="Widgets" items={widgetsItems} />
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

export default Addwid;
