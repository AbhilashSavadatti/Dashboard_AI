import React, { useState } from "react";
import Mp3viewer from "./Mp3viewer";
import { useUser } from "../../context/UserContext";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import "@cyntler/react-doc-viewer/dist/index.css";
import "./style.css";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileCsv,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FileIcon = ({ fileType }) => {
  switch (fileType) {
    case "pdf":
      return <FaFilePdf style={{ color: "red", fontSize: "94px" }} />;
    case "doc":
    case "docx":
      return <FaFileWord style={{ color: "blue", fontSize: "94px" }} />;
    case "xls":
    case "xlsx":
      return <FaFileExcel style={{ color: "green", fontSize: "94px" }} />;
    case "csv":
      return <FaFileCsv style={{ color: "orange" }} />;
    case "png":
    case "jpeg":
    case "jpg":
      return <FaFileImage style={{ color: "purple", fontSize: "94px" }} />;
    case "mp3":
      return <FaFileAudio style={{ color: "teal", fontSize: "94px" }} />;
    case "mp4":
      return <FaFileVideo style={{ color: "navy", fontSize: "94px" }} />;
    case "json":
    case "srt":
    case "xml":
      return <FaFileAlt style={{ color: "grey", fontSize: "94px" }} />;
    default:
      return <FaFileAlt style={{ color: "grey", fontSize: "94px" }} />;
  }
};

// const docs = [
//   {
//     // uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
//     uri: require("./assets/abcd.docx"),
//     // fileType: "docx",
//     // fileName: "demo.docx",
//   },
// ];
const MainContent = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const {
    selectedFile,
    setStructuredFileToogle,
    structuredFileToogle,
    setStructuredFileData,
  } = useUser();

  // useEffect(() => {
  //   fetch(
  //     "https://ec65-2405-201-600d-d84c-f556-5441-89b6-173.ngrok-free.app/api/view/asds/sample.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjUwNDYxMSwianRpIjoiZTkwMTc3N2MtOWIzNC00NzcyLWI5ZTktNDlhZDljNmVlZjYxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImJlYmVjYTYxZDc1YjQ1MGM4MjJhOWI3MTJhY2QyZDE4IiwibmJmIjoxNzM2NTA0NjExLCJjc3JmIjoiNDYxM2EyNmQtZTRlNy00ZmNmLWE2ZTUtMzQxZTBlZWMyODlhIiwiZXhwIjoxNzM2NTI2MjExfQ.oezsJFOLw2pdlcvZAR5qJCoLnsbfs4yk5ygmA4G9wQg&user_id=sankalp"
  //   ).then((res) => console.log(res.json()));
  // }, []);
  const navigate = useNavigate();
  const docs = [
    {
      uri: "https://www.mcgill.ca/skillsets/files/skillsets/powerpointguidelines.pdf", // Removed download=1
      fileName: "powerpointguidelines", // Add fileName property
      fileType: "ppt", // Add fileType property
      // queryParams: {
      //   token:
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjUwODgwNywianRpIjoiNjBlYjdlZDQtMzYzOS00NGNjLWE2N2QtNTQ3M2JkZTQ3NzE0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImJlYmVjYTYxZDc1YjQ1MGM4MjJhOWI3MTJhY2QyZDE4IiwibmJmIjoxNzM2NTA4ODA3LCJjc3JmIjoiNWRmOWMwNTQtMjVlZC00Y2ZkLTkyMGEtNDA0MTMwYTI0ZGEzIiwiZXhwIjoxNzM2NTMwNDA3fQ.vaXuOBIAZjgb8aI8fM_ZJFH9bWIJ6u8prf2mTv84sO8",
      //   user_id: "sankalp",
      // },
    },
  ];
  const handleFileClick = (folderName, fileName, fileType) => {
    setStructuredFileData({ folderName, fileName, fileType });
    setStructuredFileToogle(!structuredFileToogle);
    // navigate("/file-preview", { state: { folderName, fileName, fileType } });
  };

  // useEffect(() =>{
  //   console.log(selectedFile);
  // },[selectedFile])

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "mp3":
        return <Mp3viewer />;
      // Add more cases here for other components (e.g., Video, XML, etc.)
      default:
        return <p>Resizable content goes here.</p>;
    }
  };

  return (
    <>
      <div className="main-content">
        {/* <div className="toolbar">
          <button onClick={() => setActiveComponent("mp3")}>MP3</button>
          <button onClick={() => setActiveComponent("video")}>Video</button>
          <button onClick={() => setActiveComponent("xml")}>XML</button>
          <button onClick={() => setActiveComponent("xls")}>XLS/XLSX</button>
          <button onClick={() => setActiveComponent("csv")}>CSV</button>
          <button onClick={() => setActiveComponent("json")}>JSON</button>
          <button onClick={() => setActiveComponent("png")}>PNG/JPEG</button>
          <button onClick={() => setActiveComponent("srt")}>SRT</button>
        </div>
        <h4>Main Content Area</h4> */}
        <div className="main-file">
          <div>
            {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} /> */}
            {/* <DocViewer
              documents={docs}
              style={{ height: 1000 }}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                },
              }}
            /> */}
            {/* <DocumentViewer
              fileName={"samplepptx.pptx"}
              folderName={"askdsa"}
            /> */}
          </div>
          <div className="grid-container">
            {Array.isArray(selectedFile) &&
              selectedFile.map((fileObj, index) => {
                // Loop through all folder keys in fileObj dynamically
                return Object.keys(fileObj).map((folderKey) => {
                  const fileArray = fileObj[folderKey]; // Dynamically get the folder files

                  return (
                    <div key={folderKey}>
                      <h3 className="folder-name">{folderKey}</h3>
                      <div className="folder-container">
                        {fileArray.map((file, fileIndex) => {
                          // Get the file name and type from file path
                          const fileName = file.file_name;
                          const fileType = fileName.split(".").pop(); // Extract file extension

                          return (
                            <div
                              key={fileIndex}
                              className="grid-item"
                              onClick={() =>
                                handleFileClick(folderKey, fileName, fileType)
                              }
                            >
                              <FileIcon fileType={fileType} />
                              <p className="file-name">{fileName}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="folder-divider"></div>
                    </div>
                  );
                });
              })}
          </div>
        </div>
        {/*     {renderActiveComponent()} */}
      </div>
    </>
  );
};

export default MainContent;
