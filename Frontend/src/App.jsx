// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // This is your dashboard view (Navbar, Sidebar, MainContent, etc.)
import CreateClassroomObject from "./pages/CreateClassroomObject";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessKey")}`;
      try {
        await axios.post("http://127.0.0.1:8000/api/users/homepage");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }
  return (
    <Routes>
      <Route index element={isAuthenticated ? <Dashboard /> : <Login />} />
    </Routes>
  );
};

export default App;
