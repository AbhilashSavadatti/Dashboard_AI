import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const FolderFileModal = ({ onClose }) => {
  const { user } = useUser(); // Access the user object from context
  const [itemName, setItemName] = useState("");
  const [folderContents, setFolderContents] = useState([]); // To store created folders
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!itemName) {
      alert("Please enter a folder name.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://v2back.smartcardai.com/create_folder",
        { folder_name: itemName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const newFolder = {
          name: itemName,
          id: response.data?.id || Date.now(),
        };
        setFolderContents((prevContents) => [...prevContents, newFolder]); // Add new folder to state
        setItemName(""); // Reset the input field
      } else {
        alert("Failed to create folder. Please try again.");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      setError("An error occurred while creating the folder.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Folder Contents</h3>
        {folderContents.length === 0 ? (
          <p>No folders created yet.</p>
        ) : (
          <ul>
            {folderContents.map((folder) => (
              <li key={folder.id}>{folder.name}</li>
            ))}
          </ul>
        )}
        <h3>Create New Folder</h3>
        <input
          type="text"
          placeholder="Enter Folder Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <div className="button-group">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Creating..." : "Save"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
