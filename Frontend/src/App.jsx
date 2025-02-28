// Frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import CreateClassroom from "./pages/classroom/CreateClassroom";
import ClassroomObjects from "./pages/classroom/ClassroomObjects";
import { Toaster } from "react-hot-toast";
import UpdateClassroom from "./pages/classroom/UpdateClassroom";
import Blocks from "./pages/Blocks";
import StudentInput from "./pages/StudentInput"; // Import the new page
import NewExam from "./pages/exam/NewExam";

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
        <Route exact path="/login" element={isAuthenticated ? <Navigate to="/" />: <Login/> }/>
        <Route index exact element={isAuthenticated ? <Dashboard username={username} setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />} />

        {/* classroom routes */}
        <Route exact path="/classrooms" element={<ClassroomObjects/> }/>
        <Route exact path="/create-classroom" element={<CreateClassroom/> }/>
        <Route exact path="/update-classroom" element={<UpdateClassroom/> }/>
        <Route exact path="/blocks" element={<Blocks/> }/>
        <Route exact path="/student-input" element={<StudentInput/> }/> {/* Add the new route */}

        {/* new routes */}
        <Route path="/new-exam" element={isAuthenticated ? <NewExam/> : <Navigate to="/login"/>} />
        <Route path="*" element={<ErrorPage/>}/>

      </Routes>
      <Toaster />
    </>
  );
};

export default App;
