import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const DynamicTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const rowsPerPage = 5;
  const { structuredFileData, setStructuredFileToogle } = useUser();
  console.log(structuredFileData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://v2back.smartcardai.com/table_data/${
            structuredFileData?.fileName?.split(".")?.[0]
          }`
        );
        const data = await response.json();
        setTableData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    const filtered = tableData.filter((item) =>
      Object.keys(filters).every(
        (filterKey) =>
          !filters[filterKey] || item[filterKey] === filters[filterKey]
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const renderTableHeaders = () => {
    if (filteredData.length === 0) return null;
    return Object.keys(filteredData[0]).map((key) => <th key={key}>{key}</th>);
  };

  const renderTableRows = () => {
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(start, start + rowsPerPage);
    return paginatedData.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, idx) => (
          <td key={idx}>{value}</td>
        ))}
      </tr>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((page) => (
      <button
        key={page}
        className={page === currentPage ? "active" : ""}
        onClick={() => setCurrentPage(page)}
        disabled={page === currentPage}
      >
        {page}
      </button>
    ));
  };

  const renderFilters = () => {
    if (tableData.length === 0) return null;
    const keys = Object.keys(tableData[0]);
    return keys.map((key) => (
      <select
        key={key}
        onChange={(e) => handleFilterChange(key, e.target.value)}
        value={filters[key] || ""}
      >
        <option value="">All {key}</option>
        {[...new Set(tableData.map((item) => item[key]))].map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    ));
  };

  return (
    <div
      style={{
        position: "absolute",
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        zIndex: "100",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "red",
      }}
    >
      <button onClick={() => setStructuredFileToogle((file) => !file)}>
        {" "}
        close
      </button>
      <div className="filter-row">{renderFilters()}</div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div
        className="pagination"
        style={{ margin: "20px 0", textAlign: "center" }}
      >
        {renderPagination()}
      </div>
    </div>
  );
};

export default DynamicTable;
