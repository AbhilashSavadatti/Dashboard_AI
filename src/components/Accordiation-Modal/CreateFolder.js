import React, { useState } from "react";
import "./styleForModal.css"; // Import the CSS file

const CreateFolder = ({ onClose, onAddFolder }) => {
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (e) => setFolderName(e.target.value);

  const handleSave = () => {
    if (!folderName) {
      alert("Please enter a folder name");
      return;
    }

    const allData = {
      name: folderName,
    };

    onAddFolder(allData);

    // Reset the form
    setFolderName("");

    onClose(); // Close the modal after saving
  };

  return (
    <div className="folder-files-modal">
      <h3>Add New Folder</h3>
      <div className="input-group">
        <label>Folder Name:</label>
        <input
          type="text"
          value={folderName}
          onChange={handleFolderNameChange}
        />
      </div>

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose} className="cancel-button">
        Cancel
      </button>
    </div>
  );
};

export default CreateFolder;
