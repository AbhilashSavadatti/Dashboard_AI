import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./pages/MainLayout";
import FilePreview from "./components/Mainviewer/FilePreview";
import DynamicTable from "./components/Table-Modal/DynamicTable";
import DocumentViewer from "./components/UnstructurePreview/DoumentViewer";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            // <ProtectedRoutes>
            <MainLayout />
            // </ProtectedRoutes>
          }
        />

        {/* Redirect unknown paths to login */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
