import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaPlus, FaTrash } from "react-icons/fa"; // Added FaFolderOpen
import prompt from "../assets/icons/pngs/prompt.png";

const AccordionSection = ({
  title,
  items = [],
  onAddItem,
  onDeleteItem,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (itemName) => {
    setSelectedItem((prevSelected) =>
      prevSelected === itemName ? null : itemName
    );
  };

  const accordionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "16px",
  };

  const contentStyle = {
    padding: "10px",
    marginLeft: "20px",
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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={prompt}
            alt="Prompt Icon"
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
          />
          <span style={titleStyle}>{title}</span>
        </div>

        <button
          onClick={toggleAccordion}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          {isOpen ? (
            <FaFolderOpen style={{ color: "grey" }} size={20} />
          ) : (
            <FaFolder style={{ color: "grey" }} size={20} />
          )}
        </button>

        <button
          onClick={onAddItem}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginLeft: "10px",
            color: "grey",
          }}
        >
          <FaPlus size={20} />
        </button>
      </div>
      {isOpen && (
        <div style={contentStyle}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => onItemClick(item)}
            >
              <span>{item.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  marginLeft: "10px",
                  color: "grey",
                }}
              >
                <FaTrash size={20} />
              </button>
              <label style={checkboxContainerStyle}>
                <input
                  type="checkbox"
                  checked={selectedItem === item.name}
                  onChange={() => handleCheckboxChange(item.name)}
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
          ))}
        </div>
      )}
    </div>
  );
};

const Promptlibrary = () => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [parentItem, setParentItem] = useState(null);
  const [currentSection, setCurrentSection] = useState("PROMPT LIBRARY");
  const [promptLibraryItems, setPromptLibraryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for the modal

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  };

  const openModal = (section) => {
    setCurrentSection(section);
    setShowModal(true);
  };

  const handleAddItem = () => {
    const newItemObject = { name: newItem, parent: parentItem };
    setPromptLibraryItems([...promptLibraryItems, newItemObject]);
    setNewItem("");
    setShowModal(false);
    setParentItem(null);
  };

  const handleEditItem = () => {
    const updatedItems = promptLibraryItems.map((item) =>
      item.name === selectedItem.name ? { ...item, name: newItem } : item
    );
    setPromptLibraryItems(updatedItems);
    setShowModal(false);
  };

  const handleDeleteItem = (item) => {
    const updatedItems = promptLibraryItems.filter((i) => i !== item);
    setPromptLibraryItems(updatedItems);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setShowModal(true); // Open the modal
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccordionSection
          title="PROMPT LIBRARY"
          items={promptLibraryItems}
          onAddItem={() => openModal("promptLibrary")}
          onDeleteItem={handleDeleteItem}
          onItemClick={handleItemClick} // Handle item click to open the modal
        />
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>
              {selectedItem
                ? `Edit Item: "${selectedItem.name}"`
                : `Add New Item to ${currentSection}`}
            </h3>
            <textarea
              rows="4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item details..."
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={selectedItem ? handleEditItem : handleAddItem}>
              {selectedItem ? "Save Edited Item" : "Add new Item"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setParentItem(null);
                setSelectedItem(null); // Reset selected item
              }}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promptlibrary;
