import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import folderImage from "../../assets/icons/pngs/folder1.png";
import Checkbox from "../ui/checkbox";
import {
  FaFolderOpen,
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileCsv,
  FaFileImage,
  FaFileAlt,
  FaFileAudio,
  FaFileVideo,
} from "react-icons/fa";
import "./FilesAndFolderAccordion.css";

const FilesAndFolderAccordion = () => {
  const { filesAndFoldersData, setSelectedFile, selectedFile } = useUser();
  const [folders, setFolders] = useState(
    filesAndFoldersData.map((folder) => ({
      folder_name: folder.folder_name.split("_").pop(), // Extract plain folder name
      full_folder_name: folder.folder_name, // Full folder name for backend
      files: folder.files,
    })) || []
  );
  const [selectedFiles, setSelectedFiles] = useState({});

  const [openFolder, setOpenFolder] = useState(false);
  const [openSubFolder, setOpenSubFolder] = useState({});

  // Synchronize selectedFiles with selectedFile[0]
  useEffect(() => {
    if (selectedFile[0]) {
      setSelectedFiles(selectedFile[0]);
      console.log(selectedFile);
    }
  }, [selectedFile]);

  const getFileIcon = (extension) => {
    switch (extension) {
      case "pdf":
        return <FaFilePdf style={{ color: "red" }} />;
      case "doc":
      case "docx":
        return <FaFileWord style={{ color: "blue" }} />;
      case "xls":
      case "xlsx":
        return <FaFileExcel style={{ color: "green" }} />;
      case "csv":
        return <FaFileCsv style={{ color: "orange" }} />;
      case "png":
      case "jpeg":
      case "jpg":
        return <FaFileImage style={{ color: "purple" }} />;
      case "mp3":
        return <FaFileAudio style={{ color: "teal" }} />;
      case "mp4":
        return <FaFileVideo style={{ color: "navy" }} />;
      case "json":
      case "srt":
      case "xml":
        return <FaFileAlt style={{ color: "grey" }} />;
      default:
        return <FaFileAlt style={{ color: "grey" }} />;
    }
  };

  const toggleFileSelection = (folderIndex, file) => {
    const folder = folders[folderIndex];
    const key = folder.folder_name;

    setSelectedFiles((prev) => {
      const currentFiles = prev[key] || [];
      let updatedFiles;

      // Check if the file is already selected
      if (currentFiles.some((f) => f.file_name === file.file_name)) {
        // If the file is selected, remove it
        updatedFiles = currentFiles.filter(
          (f) => f.file_name !== file.file_name
        );
      } else {
        // If the file is not selected, add the full file object
        updatedFiles = [...currentFiles, file];
      }

      const updatedSelections = { ...prev, [key]: updatedFiles };

      // Update selectedFile at index 0 with the updated selections
      setSelectedFile((prevSelected) => {
        const updatedFileArray = [...prevSelected];
        updatedFileArray[0] = updatedSelections; // Replace the first element

        return updatedFileArray;
      });

      return updatedSelections;
    });
  };

  const toggleFolderSelection = (folderIndex) => {
    const folder = folders[folderIndex];
    const key = folder.folder_name;
    const allFiles = folder.files;

    setSelectedFiles((prev) => {
      const currentFiles = prev[key] || [];
      let updatedFiles;

      // If all files are selected, deselect them
      if (currentFiles.length === allFiles.length) {
        updatedFiles = [];
      } else {
        updatedFiles = allFiles; // Select all files
      }

      const updatedSelections = { ...prev, [key]: updatedFiles };

      // Update selectedFile at index 0 with the updated selections
      setSelectedFile((prevSelected) => {
        const updatedFileArray = [...prevSelected];
        updatedFileArray[0] = updatedSelections;

        return updatedFileArray;
      });

      return updatedSelections;
    });
  };

  const toggleOpenSubFolder = (index) => {
    setOpenSubFolder((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the state for the specific index
    }));
  };

  return (
    <div className="files-and-folder-accordion">
      <div className="accordion-header">
        <div className="accordion-title">
          <img
            src={folderImage}
            alt="folder"
            className="folder-icon"
            style={{ marginRight: "10px", width: "30px", height: "25px" }}
          />
          <h3>FOLDER & FILES</h3>
        </div>

        {openFolder ? (
          <FaFolderOpen
            className="folder-icon-fa"
            onClick={() => setOpenFolder(!openFolder)}
          />
        ) : (
          <FaFolder
            className="folder-icon-fa"
            onClick={() => setOpenFolder(!openFolder)}
          />
        )}
      </div>

      {openFolder && (
        <div className="folder-list">
          {folders.map((folder, index) => (
            <div className="folder-item" key={index}>
              <div className="folder-header">
                <div className="folder-title">
                  {openSubFolder[index] ? (
                    <FaFolderOpen
                      className="subfolder-icon"
                      onClick={() => toggleOpenSubFolder(index)}
                    />
                  ) : (
                    <FaFolder
                      className="subfolder-icon"
                      onClick={() => toggleOpenSubFolder(index)}
                    />
                  )}
                  <p>{folder.folder_name}</p>
                </div>

                <Checkbox
                  onChange={() => toggleFolderSelection(index)}
                  checked={
                    selectedFiles[folder.folder_name]?.length ===
                      folder.files.length && folder.files.length > 0
                  }
                />
              </div>

              {openSubFolder[index] && (
                <ul className="file-list">
                  {folder.files.map((file, fileIndex) => {
                    const fileExtension = file.file_name.split(".").pop();
                    return (
                      <li className="file-item" key={fileIndex}>
                        <div className="file-info">
                          {getFileIcon(fileExtension)}
                          <p className="file-name">{file.file_name}</p>
                        </div>
                        <div className="file-actions">
                          <Checkbox
                            onChange={() => toggleFileSelection(index, file)}
                            checked={selectedFiles[folder.folder_name]?.some(
                              (selectedFile) =>
                                selectedFile.file_name === file.file_name
                            )}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesAndFolderAccordion;
