import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // This is your dashboard view (Navbar, Sidebar, MainContent, etc.)
import CreateClassroomObject from "./pages/CreateClassroomObject";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username,setUsername]=useState("Guest");

  useEffect(() => {
    const checkAuth = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessKey")}`;
      try {
        const res=await axios.post("http://127.0.0.1:8000/api/users/homepage");
        setUsername(res.data.username);
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
      <Route index element={isAuthenticated ? <Dashboard username={username}  setIsAuthenticated={setIsAuthenticated}/> : <Login />} />
    </Routes>
  );
};

export default App;
