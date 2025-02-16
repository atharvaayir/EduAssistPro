import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // This is your dashboard view (Navbar, Sidebar, MainContent, etc.)
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import CreateClassroom from "./pages/CreateClassroom";
import ClassroomObjects from "./pages/ClassroomObjects";
import { Toaster } from "react-hot-toast";
import UpdateClassroom from "./pages/UpdateClassroom";

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
    <>
      <Routes>
        <Route exact path="/login" element={isAuthenticated ? <Dashboard username={username}/>: <Login/> }/>
        <Route index exact element={isAuthenticated ? <Dashboard username={username}  setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />} />

        {/* classroom routes */}
        <Route exact path="/classrooms" element={<ClassroomObjects/> }/>
        <Route exact path="/create-classroom" element={<CreateClassroom/> }/>
        <Route exact path="/update-classroom" element={<UpdateClassroom/> }/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
