import React, { useState } from "react";

const DocumentViewer = ({ folderName, fileName }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The ngrok URL you're sharing with them
  const PREVIEW_URL =
    "https://a549-2405-201-600d-d84c-f556-5441-89b6-173.ngrok-free.app";

  // Their auth details (they should replace these with their own)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjUwMjg2NiwianRpIjoiYWU0ZjQ0MzgtMDA4ZC00OWNlLWE5NTktZGRkYmIwNGJhYTA1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImJlYmVjYTYxZDc1YjQ1MGM4MjJhOWI3MTJhY2QyZDE4IiwibmJmIjoxNzM2NTAyODY2LCJjc3JmIjoiNGUyMThiOTEtM2ZmOC00ZjFhLTliMDQtZTllMjdjYTdjOWExIiwiZXhwIjoxNzM2NTI0NDY2fQ.iqdwhdf5UqV__atjjBuEo10OjS5MmTMw2p05jmapFVc";
  const userId = "sankalp";

  const previewUrl = `${PREVIEW_URL}/preview/${folderName}/${fileName}?token=${token}&user_id=${userId}`;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading document...
        </div>
      )}

      <iframe
        src={previewUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: loading ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError("Failed to load preview");
          setLoading(false);
        }}
        title="Document Preview"
      />

      {error && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
