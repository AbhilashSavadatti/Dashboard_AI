import React from "react";
import DocumentPreview from "./DoumentViewer";

const PreviewPage = () => {
  return (
    <div>
      <h1>Document Preview</h1>
      <DocumentPreview folderName="example-folder" fileName="example.pdf" />
    </div>
  );
};

export default PreviewPage;
