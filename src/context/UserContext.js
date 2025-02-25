import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLogined: false,
  login: () => {},
  logout: () => {},
  dbData: null,
  setDbData: () => {},
  connectionData: null,
  setConnectionData: () => {},
  filesAndFoldersData: null,
  setFilesAndFoldersData: () => {},
  selectedFile: [],
  setSelectedFile: () => {},
  structuredFileToogle: false,
  structuredFileData: null,
  setStructuredFileToogle: () => {},
  setStructuredFileData: () => {},
  dashboardItems: [],
  setDashboardItems: () => {},
});

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODkyMTQ3MiwianRpIjoiNmM0NjQ5MjctMzAyZi00ZDZlLWFiYzgtODk1ZmI2ZjljODlmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRjZmQwMmMwNmMwNzRmNjFhNGUyMzMxODYyOTNiNDc5IiwibmJmIjoxNzM4OTIxNDcyLCJjc3JmIjoiMjVjODk0Y2QtMGFiOS00N2QxLWFmZGItYWE1ZWEyYjM5NDVmIiwiZXhwIjoxNzM4OTQzMDcyfQ.3vgNuY3QDPGwdA9PWYD_etLtg5jT957V9LHuNZt6dTs",
    token_type: "Bearer",
  }); // Default to null until checked
  const [dbData, setDbData] = useState(null);
  const [structuredFileToogle, setStructuredFileToogle] = useState(false);
  const [structuredFileData, setStructuredFileData] = useState(null);
  const [connectionData, setConnectionData] = useState(null);
  const [filesAndFoldersData, setFilesAndFoldersData] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [loading, setLoading] = useState(true); // Track initialization
  const [selectedFile, setSelectedFile] = useState([]);
  const [dashboardItems, setDashboardItems] = useState([]);

  // Check if user exists in localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser && storedUser.access_token) {
        setUser(storedUser);
        setIsLogined(true);
      }
    } catch (error) {
      console.error("Error retrieving user from localStorage:", error);
    } finally {
      setLoading(false); // Initialization complete
    }
  }, []);

  // Login function to update user state and localStorage
  const login = (userData) => {
    // Store user data in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLogined(true);
  };

  // Logout function to clear user state and sessionStorage
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsLogined(false);
  };

  if (loading) {
    // Prevent rendering children until loading is complete
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogined,
        login,
        logout,
        dbData,
        setDbData,
        connectionData,
        setConnectionData,
        filesAndFoldersData,
        setFilesAndFoldersData,
        selectedFile,
        setSelectedFile,
        structuredFileToogle,
        setStructuredFileToogle,
        structuredFileData,
        setStructuredFileData,
        dashboardItems,
        setDashboardItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};
