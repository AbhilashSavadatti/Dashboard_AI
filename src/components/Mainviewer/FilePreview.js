import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const FilePreview = () => {
  const location = useLocation();
  const { folderName, fileName, fileType } = location.state || {};
  const { user } = useUser();
  const newFolderName = `e8f88898e7a64c25a3bb43361cde4219_${folderName}`;
  const newFilePath = `/uploads/${newFolderName}/${fileName}`;

  const [fileData, setFileData] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [jsonData, setJsonData] = useState(null); // For storing JSON content

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://v2back.smartcardai.com/list_contents",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setFileData(response.data);
      } catch (error) {
        console.error("Error loading file:", error);
      }
    };
    fetchData();
  }, [user.access_token]);

  useEffect(() => {
    if (fileData && folderName && fileName) {
      const folder = fileData.find(
        (folder) => folder.folder_name === newFolderName
      );

      if (folder) {
        const file = folder.files.find((file) => file.file_name === fileName);
        if (file) {
          setFilePath(file.file_path);
        }
      }
    }
    console.log(newFilePath);
    console.log(fileName);
    console.log(newFolderName);
  }, [fileData, folderName, fileName, newFolderName]);

  useEffect(() => {
    // Fetch the content of the JSON file if the file type is JSON
    if (fileType === "json" && filePath) {
      const fetchJsonData = async () => {
        try {
          const response = await axios.get(filePath);
          setJsonData(response.data);
        } catch (error) {
          console.error("Error loading JSON file:", error);
        }
      };
      fetchJsonData();
    }
  }, [filePath, fileType]);

  if (!fileName || !fileType) {
    return <p>No file selected for preview.</p>;
  }

  const renderPreview = () => {
    switch (fileType) {
      case "png":
      case "jpeg":
      case "jpg":
        return <img alt={fileName} className="image-preview" src={filePath} />;
      case "pdf":
        return (
          <div className="pdf-preview">
            <embed
              src={filePath}
              width="100%"
              height="600px"
              type="application/pdf"
            />
          </div>
        );
      case "json":
        return jsonData ? (
          <pre className="json-preview">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        ) : (
          <p>Loading JSON data...</p>
        );
      default:
        return <p>Preview not available for this file type.</p>;
    }
  };

  return (
    <div className="file-preview">
      <h2>Preview: {fileName}</h2>
      {renderPreview()}
    </div>
  );
};

export default FilePreview;
