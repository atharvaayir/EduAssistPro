// Frontend/src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import ClassroomObjects from "./pages/classroom/ClassroomObjects";
import CreateClassroom from "./pages/classroom/CreateClassroom";
import UpdateClassroom from "./pages/classroom/UpdateClassroom";
import Blocks from "./pages/Blocks";
import StudentInput from "./pages/StudentInput";
import ErrorPage from "./pages/ErrorPage";
import NewExam from "./pages/exam/NewExam";
import SeatingArrangement from "./pages/SeatingArrangement";

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
      <Toaster />
      {
        isAuthenticated===true? (
          <div className="flex flex-col h-screen">
            {/* Top Navigation Bar */}
            <Navbar adminName={username} setIsAuthenticated={setIsAuthenticated} />
    
            {/* Main Dashboard Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Collapsible Sidebar */}
              <Sidebar />
    
              {/* Main Content Area */}
              <div className="flex-1 bg-gray-100 p-6 overflow-auto">
              <Routes>
                {/* classroom routes */}
                <Route index exact element={isAuthenticated ? <Dashboard username={username}  setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />} />
                <Route exact path="/classrooms" element={<ClassroomObjects />} />
                <Route exact path="/create-classroom" element={<CreateClassroom />} />
                <Route exact path="/update-classroom" element={<UpdateClassroom />} />
                <Route exact path="/blocks" element={<Blocks />} />
                <Route exact path="/student-input" element={<StudentInput />} />{" "}
                <Route exact path="/seating-arrangement" element={<SeatingArrangement />} />{" "}
                <Route exact path="/new-exam" element={isAuthenticated ? <NewExam /> : <Navigate to="/login" />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              </div>
            </div>
          </div>)
          : ( <Login />)
        }
    </>
  );
};

export default App;
