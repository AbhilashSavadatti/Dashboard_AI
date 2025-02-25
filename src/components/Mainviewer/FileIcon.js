import React from "react";
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

export default FileIcon;
