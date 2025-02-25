import { Download } from "lucide-react";
import React from "react";

// TableViewer Component
const Tableviewer = () => {
  // Store the HTML content in a regular variable (not state)
  const content = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>25</td>
          <td>New York</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>30</td>
          <td>London</td>
        </tr>
      </tbody>
    </table>
  `;

  return (
    <div>
      <h1>Dynamic Table</h1>
      {/* Inject CSS styles directly */}
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse; /* Prevents double borders */
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc; /* Light grey border for cells */
          }
          th {
            background-color: #d3d3d3; /* Grey color for header cells */
            color: #333; /* Dark text color for headers */
          }
          tbody tr:nth-child(even) {
            background-color: #f9f9f9; /* Zebra stripes for rows */
          }
        `}
      </style>
      {/* Render the stored HTML content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* <button
        style={{
          margin: "25px 0",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0",
            color: "#424242",
          }}
        >
          <div
            style={{
              width: "20px", // Control width
              height: "20px", // Control height
              margin: "0 5px",
            }}
          >
            <Download style={{ width: "100%", height: "100%" }} />
          </div>
          <p style={{ margin: "0px 7px", fontSize: "13px", color: "#424242" }}>
            Download Table
          </p>
        </span>
      </button> */}
    </div>
  );
};

export default Tableviewer;
