import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // This is your dashboard view (Navbar, Sidebar, MainContent, etc.)
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import CreateClassroomObject from "./pages/CreateClassroomObject";
import ClassroomObjects from "./pages/ClassroomObjects";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username,setUsername]=useState("Guest");

  useEffect(() => {
    const checkAuth = async () => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessKey")}`;
      try {
        const res=await axios.post("http://localhost:8000/api/users/homepage");
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
      <Route exact path="/login" element={isAuthenticated ? <Dashboard username={username}/>: <Login/> }/>
      <Route index exact element={isAuthenticated ? <Dashboard username={username}  setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />} />
      <Route exact path="/classroom-object" element={isAuthenticated ? <ClassroomObjects/>: <ErrorPage/> }/>
      <Route exact path="/create-classroom-object" element={isAuthenticated ? <CreateClassroomObject/>: <ErrorPage/> }/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  );
};

export default App;
