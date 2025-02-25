import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import apis from "../../assets/icons/pngs/apis.png";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import Checkbox from "../ui/checkbox";
import "./ApiAccordion.css";

const ApiAccordion = () => {
  const [toogleAccordian, setToggleAccordian] = useState(false);
  const [selectedConnections, setSelectedConnections] = useState({});

  const { connectionData, setSelectedFile, selectedFile } = useUser();

  const apiTypeIcons = {
    "Google Spreadsheet API":
      "https://www.svgrepo.com/show/353739/google-spreadsheets.svg",
    "Excel Spreadsheet API":
      "https://www.svgrepo.com/show/303196/excel-logo.svg",
    "Hubspot API": "https://www.svgrepo.com/show/303247/hubspot.svg",
    "Salesforce API": "https://www.svgrepo.com/show/303395/salesforce.svg",
    "Slack API": "https://www.svgrepo.com/show/303386/slack.svg",
    "Zoho ERP API": "https://www.svgrepo.com/show/374076/zoho.svg",
    "Tally ERP 9 API": "https://www.svgrepo.com/show/403859/tally.svg",
    "Odoo API": "https://www.svgrepo.com/show/276448/odoo.svg",
  };

  const toggleApiSelection = (api) => {
    setSelectedConnections((prev) => {
      const updatedSelections = { ...prev };

      if (updatedSelections[api.api_id]) {
        delete updatedSelections[api.api_id];
      } else {
        updatedSelections[api.api_id] = api; // Store the API object
      }

      setSelectedFile((prevSelected) => {
        const updatedFiles = [...prevSelected];
        const newFileData = Object.values(updatedSelections);

        if (updatedFiles.length < 2) {
          updatedFiles[1] = newFileData;
        } else {
          updatedFiles[1] = newFileData;
        }

        return updatedFiles;
      });

      return updatedSelections;
    });
  };

  return (
    <>
      <div className="api-accordion-header">
        <div className="api-accordion-title">
          <img src={apis} alt="apis" className="api-icon" />
          <h3>API CONNECTIONS</h3>
        </div>

        {toogleAccordian ? (
          <FaFolderOpen
            className="folder-icon"
            onClick={() => setToggleAccordian(!toogleAccordian)}
          />
        ) : (
          <FaFolder
            className="folder-icon"
            onClick={() => setToggleAccordian(!toogleAccordian)}
          />
        )}
      </div>

      <div className="api-accordion-body">
        {toogleAccordian &&
          connectionData.length > 0 &&
          connectionData.map((connection) => (
            <div className="api-accordion-item" key={connection.api_id}>
              <div className="api-item">
                <img
                  src={apiTypeIcons[connection.api_type] || apis}
                  alt={connection.api_type}
                  className="api-type-icon"
                />
                <p>{connection.api_name}</p>
              </div>
              <Checkbox
                checked={
                  selectedFile[1]?.some(
                    (item) => item.api_id === connection.api_id
                  ) || false
                }
                onChange={() => toggleApiSelection(connection)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ApiAccordion;
