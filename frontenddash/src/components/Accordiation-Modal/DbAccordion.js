import React, { useState, useEffect } from "react";
import { FaFolderOpen, FaDatabase, FaFolder } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import Checkbox from "../ui/checkbox";
import "./DbAccordion.css";

const DbAccordion = () => {
  const { dbData, setSelectedFile, selectedFile } = useUser(); // Fetch dbData and user data from useUser()
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [connections, setConnections] = useState([]); // Initialize with empty array
  const [selectedConnections, setSelectedConnections] = useState({});

  const dbTypeIcons = {
    MySQL:
      "https://img.icons8.com/?size=100&id=6byjJLud2ypb&format=png&color=000000",
    PostgreSQL: "https://www.svgrepo.com/show/374003/postgresql.svg",
    MongoDB: "https://www.svgrepo.com/show/331488/mongodb.svg",
    Oracle: "https://www.svgrepo.com/show/354057/oracle.svg",
    SQLite: "https://www.svgrepo.com/show/354268/sqlite.svg",
    Redis: "https://www.svgrepo.com/show/354284/redis.svg",
  };

  useEffect(() => {
    if (dbData && dbData.length > 0) {
      setConnections(dbData);
    }
  }, [dbData]);

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const toggleConnectionSelection = (connection) => {
    setSelectedConnections((prev) => {
      const updatedSelections = { ...prev };

      if (updatedSelections[connection.connection_id]) {
        delete updatedSelections[connection.connection_id];
      } else {
        updatedSelections[connection.connection_id] = connection;
      }

      setSelectedFile((prevSelected) => {
        const updatedFiles = [...prevSelected];
        const newFileData = Object.values(updatedSelections);

        if (updatedFiles.length < 3) {
          updatedFiles[2] = newFileData;
        } else {
          updatedFiles[2] = newFileData;
        }

        return updatedFiles;
      });

      return updatedSelections;
    });
  };

  return (
    <div className="db-accordion">
      <div className="db-accordion-header">
        <div className="db-accordion-title">
          <FaDatabase className="db-icon" />
          <span className="db-title-text">DB CONNECTORS</span>
        </div>
        <div className="db-accordion-icons">
          {isAccordionOpen ? (
            <FaFolderOpen className="folder-icon" onClick={toggleAccordion} />
          ) : (
            <FaFolder className="folder-icon" onClick={toggleAccordion} />
          )}
        </div>
      </div>

      {isAccordionOpen && (
        <div className="db-accordion-body">
          {connections.length > 0 ? (
            <ul className="db-accordion-list">
              {connections.map((connection) => (
                <li
                  className="db-accordion-item"
                  key={connection.connection_id}
                >
                  <div className="db-connection-details">
                    <img
                      src={dbTypeIcons[connection.db_type] || dbTypeIcons.MySQL}
                      alt={connection.db_type}
                      className="db-type-icon"
                    />
                    <p className="db-connection-text">{connection.db_name}</p>
                  </div>
                  <Checkbox
                    checked={
                      selectedFile[2]?.some(
                        (item) =>
                          item.connection_id === connection.connection_id
                      ) || false
                    }
                    onChange={() => toggleConnectionSelection(connection)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="db-no-connections">No connections available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DbAccordion;
