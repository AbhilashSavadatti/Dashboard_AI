// import React, { useState } from "react";
// import {
//   FaFolderOpen,
//   FaFolder,
//   FaDatabase,
//   FaPlug,
//   FaTrash,
//   FaPlus,
//   FaUpload,
// } from "react-icons/fa";

// import {
//   FaFilePdf,
//   FaFileWord,
//   FaFileExcel,
//   FaFileCsv,
//   FaFileImage,
//   FaFileAlt,
//   FaFileAudio,
//   FaFileVideo,
// } from "react-icons/fa";

// import folder from "../icons/folder1.png";
// import apis from "../icons/apis.png";
// import db from "../icons/db.png";
// import prompt from "../icons/prompt.png";
// import "./ComponentsStyle.css";
// import Checkbox from "./ui/checkbox";
// import DatabaseConnectorManagementModal from "./Accordiation-Modal/DBConnector";
// import { APIConnectorModal } from "./Accordiation-Modal/ApiConnector";
// import FolderFilesModal from "./Accordiation-Modal/folder-files";

// const AccordionSection = ({
//   parentImgicon,
//   title,
//   items = [], // default to empty array if items are undefined
//   icon,
//   onAddItem,
//   onDeleteItem,
// }) => {
//   const [selectedItem, setSelectedItem] = useState(null); // Track selected item checkbox
//   const [selectedFiles, setSelectedFiles] = useState({}); // Track selected file checkboxes for each item
//   const [isOpen, setIsOpen] = useState(false);
//   const [fileInfo, setFileInfo] = useState({});

//   // Handle item checkbox change
//   const handleFolderCheckboxChange = (itemName) => {
//     setSelectedItem((prevSelectedItem) => {
//       const isAlreadySelected = prevSelectedItem === itemName;

//       // Update selected files for the folder based on the folder checkbox state
//       setSelectedFiles((prevSelectedFiles) => {
//         const itemFiles = fileInfo[itemName] || [];
//         return {
//           ...prevSelectedFiles,
//           [itemName]: isAlreadySelected
//             ? []
//             : itemFiles.map((file) => file.name), // Deselect or select all files
//         };
//       });

//       // Return the toggled state for the folder checkbox
//       return isAlreadySelected ? null : itemName;
//     });
//   };
//   // Handle file checkbox change for each item
//   const handleFileCheckboxChange = (itemName, fileName) => {
//     setSelectedFiles((prevState) => {
//       const itemFiles = prevState[itemName] || [];
//       const updatedFiles = itemFiles.includes(fileName)
//         ? itemFiles.filter((file) => file !== fileName) // Deselect file
//         : [...itemFiles, fileName]; // Select file
//       return {
//         ...prevState,
//         [itemName]: updatedFiles,
//       };
//     });
//   };

//   // Function to handle file upload for a specific item or sub-item
//   const onUploadFile = (itemName, subItemName = null) => {
//     const itemKey = subItemName ? `${itemName}-${subItemName}` : itemName;
//     document.getElementById(itemKey).click(); // Trigger the file input click event for the specific item/sub-item
//   };

//   // Function to handle file selection for multiple files
//   const handleFileChange = (event, itemName, subItemName = null) => {
//     const files = Array.from(event.target.files);
//     const itemKey = subItemName ? `${itemName}-${subItemName}` : itemName;

//     setFileInfo((prevFileInfo) => {
//       const existingFiles = prevFileInfo[itemKey] || [];
//       return {
//         ...prevFileInfo,
//         [itemKey]: [...existingFiles, ...files], // Add new files to the existing array
//       };
//     });
//   };

//   const deleteUploadedFile = (itemName, fileName) => {
//     setFileInfo((prevFileInfo) => {
//       const newFileInfo = { ...prevFileInfo };
//       const updatedFiles = newFileInfo[itemName].filter(
//         (file) => file.name !== fileName
//       );
//       newFileInfo[itemName] = updatedFiles; // Remove the specific file
//       return newFileInfo;
//     });
//     console.log(`Deleted file: ${fileName} for item: ${itemName}`);
//   };

//   return (
//     <div>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: "700px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           ...accordionStyle,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={parentImgicon}
//             alt="icon"
//             style={{ width: "24px", height: "24px" }}
//           />
//           <span style={titleStyle}>{title}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           {isOpen ? (
//             <FaFolderOpen style={{ color: "grey" }} />
//           ) : (
//             <FaFolder style={{ color: "grey" }} />
//           )}
//           <FaPlus
//             style={{
//               fontSize: "16px",
//               marginLeft: "10px",
//               cursor: "pointer",
//               color: "grey",
//             }}
//             onClick={(e) => {
//               e.stopPropagation();
//               onAddItem();
//             }}
//           />
//         </div>
//       </div>
//       {isOpen && (
//         <div style={contentStyle}>
//           {items.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 marginBottom: "10px",
//                 marginTop: "15px",
//                 marginLeft: "45px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <AccordionItem icon={icon} text={item.name} />
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "10px",
//                     placeItems: "center",
//                   }}
//                 >
//                   <div>
//                     {/* The FaUpload icon */}
//                     <FaUpload
//                       style={{ cursor: "pointer", color: "grey" }}
//                       onClick={() => onUploadFile(item.name)} // Trigger file upload for item
//                     />

//                     {/* Hidden file input for item */}
//                     <input
//                       id={item.name}
//                       type="file"
//                       multiple // Allow multiple file selection
//                       style={{ display: "none" }}
//                       onChange={(e) => handleFileChange(e, item.name)}
//                     />
//                   </div>
//                   <FaTrash
//                     style={{ cursor: "pointer", color: "grey" }}
//                     onClick={() => onDeleteItem(item.name)}
//                   />
//                   <Checkbox
//                     checked={selectedItem === item.name}
//                     onChange={() => handleFolderCheckboxChange(item.name)}
//                     spanStyle={{
//                       ...(selectedItem === item.name),
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* File info for item */}
//               {fileInfo[item.name] && (
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     display: "flex",
//                     flexDirection: "column",
//                     marginLeft: "30px",
//                     padding: "5px 10px",
//                   }}
//                 >
//                   {fileInfo[item.name].map((file, index) => {
//                     // Extract the file extension
//                     const fileExtension = file.name
//                       .split(".")
//                       .pop()
//                       .toLowerCase();

//                     // Determine the appropriate icon based on the file extension
//                     const getFileIcon = (extension) => {
//                       switch (extension) {
//                         case "pdf":
//                           return <FaFilePdf style={{ color: "red" }} />;
//                         case "doc":
//                         case "docx":
//                           return <FaFileWord style={{ color: "blue" }} />;
//                         case "xls":
//                         case "xlsx":
//                           return <FaFileExcel style={{ color: "green" }} />;
//                         case "csv":
//                           return <FaFileCsv style={{ color: "orange" }} />;
//                         case "png":
//                         case "jpeg":
//                         case "jpg":
//                           return <FaFileImage style={{ color: "purple" }} />;
//                         case "mp3":
//                           return <FaFileAudio style={{ color: "teal" }} />;
//                         case "mp4":
//                           return <FaFileVideo style={{ color: "navy" }} />;
//                         case "json":
//                         case "srt":
//                         case "xml":
//                           return <FaFileAlt style={{ color: "grey" }} />;
//                         default:
//                           return <FaFileAlt style={{ color: "grey" }} />;
//                       }
//                     };

//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           marginBottom: "10px",
//                           padding: "5px",
//                           border: "1px solid #ccc",
//                           transform: "translatex(15px)",
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "10px",
//                           }}
//                         >
//                           {getFileIcon(fileExtension)}
//                           <p
//                             style={{
//                               margin: 0,
//                               overflow: "hidden",
//                               maxWidth: "400px",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {file.name}
//                           </p>
//                         </div>
//                         <div>
//                           <FaTrash
//                             style={{
//                               cursor: "pointer",
//                               color: "grey",
//                               margin: "auto 10px",
//                             }}
//                             onClick={() =>
//                               deleteUploadedFile(item.name, file.name)
//                             }
//                           />
//                           <Checkbox
//                             checked={selectedFiles[item.name]?.includes(
//                               file.name
//                             )}
//                             onChange={() =>
//                               handleFileCheckboxChange(item.name, file.name)
//                             }
//                             spanStyle={{
//                               ...(selectedItem === item.name),
//                             }}
//                           />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Datasource = () => {
//   const [foldersFilesItems, setFoldersFilesItems] = useState([]);
//   const [apiConnectorItems, setAPIConnectorItems] = useState([]);
//   const [dbConnectorItems, setDBConnectorItems] = useState([]);

//   const [currentSection, setCurrentSection] = useState("");
//   const [parentItem, setParentItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleAddItem = (newConnector) => {
//     if (currentSection === "foldersFiles") {
//       setFoldersFilesItems([...foldersFilesItems, newConnector]);
//     } else if (currentSection === "apiConnectors") {
//       setAPIConnectorItems([...apiConnectorItems, newConnector]);
//     } else if (currentSection === "dbConnectors") {
//       setDBConnectorItems([...dbConnectorItems, newConnector]);
//     }

//     setShowModal(false);
//   };

//   const handleDeleteItem = (item, isSubItem = false, parent = null) => {
//     if (currentSection === "foldersFiles") {
//       if (isSubItem) {
//         const updatedItems = foldersFilesItems.map((folderItem) =>
//           folderItem.name === parent
//             ? {
//                 ...folderItem,
//                 subItems: folderItem.subItems.filter(
//                   (subItem) => subItem !== item
//                 ),
//               }
//             : folderItem
//         );
//         setFoldersFilesItems(updatedItems);
//       } else {
//         setFoldersFilesItems(
//           foldersFilesItems.filter((folderItem) => folderItem.name !== item)
//         );
//       }
//     } else if (currentSection === "apiConnectors") {
//       setAPIConnectorItems(
//         apiConnectorItems.filter((connector) => connector.name !== item)
//       );
//     } else if (currentSection === "dbConnectors") {
//       setDBConnectorItems(
//         dbConnectorItems.filter((connector) => connector.name !== item)
//       );
//     }
//   };

//   const openModal = (section, parent = null) => {
//     setCurrentSection(section);
//     setParentItem(parent);
//     setShowModal(true);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", padding: "40px" }}>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <AccordionSection
//           title="FOLDERS & FILES"
//           items={foldersFilesItems}
//           parentImgicon={folder}
//           icon={<FaFolder style={{ color: "grey" }} />}
//           onAddItem={() => openModal("foldersFiles")}
//           //  onAddSubItem={(parent) => openModal("foldersFiles", parent)}
//           onDeleteItem={handleDeleteItem}
//         />
//       </div>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <AccordionSection
//           title="API CONNECTORS"
//           parentImgicon={apis}
//           items={apiConnectorItems}
//           icon={<FaPlug style={{ color: "grey" }} />}
//           onAddItem={() => openModal("apiConnectors")}
//           onDeleteItem={handleDeleteItem}
//         />
//       </div>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <AccordionSection
//           title="DB CONNECTORS"
//           parentImgicon={db}
//           items={dbConnectorItems}
//           icon={<FaDatabase style={{ color: "grey" }} />}
//           onAddItem={() => openModal("dbConnectors")}
//         />
//       </div>

//       {showModal && (
//         <div style={modalOverlayStyle}>
//           <div style={modalStyle}>
//             {currentSection == "apiConnectors" && (
//               <APIConnectorModal
//                 onClose={() => setShowModal(false)}
//                 onAddConnector={handleAddItem}
//               />
//             )}
//             {currentSection == "dbConnectors" && (
//               <DatabaseConnectorManagementModal
//                 onClose={() => setShowModal(false)}
//                 onAddConnector={handleAddItem}
//               />
//             )}
//             {currentSection == "foldersFiles" && (
//               <FolderFilesModal
//                 onClose={() => setShowModal(false)}
//                 onAddConnector={handleAddItem}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const AccordionItem = ({ icon, text }) => (
//   <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
//     {React.cloneElement(icon, { style: { color: "grey" } })}
//     <span style={{ marginLeft: "8px" }}>{text}</span>
//   </div>
// );

// const accordionStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px",
//   cursor: "pointer",
// };

// const titleStyle = {
//   fontWeight: "bold",
//   fontSize: "16px",
// };

// const contentStyle = {
//   padding: "10px",
//   marginLeft: "20px",
// };

// const modalOverlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const modalStyle = {
//   backgroundColor: "white",
//   padding: "20px",
//   borderRadius: "5px",
//   width: "300px",
//   textAlign: "center",
// };

// export default Datasource;
