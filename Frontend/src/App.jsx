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
import ErrorPage from "./pages/ErrorPage";
import NewExam from "./pages/exam/NewExam";
import SeatingArrangement from "./pages/SeatingArrangement";
import Subjects from "./pages/subjects/Subjects";
import UpdateSubject from "./pages/subjects/UpdateSubject";
import NewSubject from "./pages/subjects/newSubject";
import Reports from "./pages/reports";
import Profile from "./pages/Profile";
import StudentDisplay from "./pages/students/StudentDisplay";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username,setUsername]=useState("Guest");
  
  const [actionButton,setActionButton]=useState(null);

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
    console.log("use effect from app");
    checkAuth();
  }, []);


  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }
  const gradientStyle = {
    background: 'linear-gradient(to right bottom, #b1c0fa, #88a5fc)'
  };
  return (
    <>
      <Toaster 
        toastOptions={{
          style: {
            background: '#333',
            color: '#191919',
            translate:'60px 00px',
            color: '#fff',
            fontWeight:'500'
          },
        }}
      
      />
      {
        isAuthenticated===true? (
          <main className="w-full flex flex-col max-h-screen h-screen">
            {/* nav bar */}
            <Navbar adminName={username} setIsAuthenticated={setIsAuthenticated}  />

            {/* content */}
            <section className='flex-grow overflow-y-auto bg-white flex'>
              {/* Side bar */}
              <Sidebar />
              {/* main content */}
              <div style={gradientStyle} className='w-full max-h-full overflow-auto rounded-t-lg mx-2 p-4 relative'>
                  <div className="absolute top-2 right-2 ">
                    {actionButton}
                  </div>
                  <Routes>
                    <Route index exact element={isAuthenticated ? <Dashboard username={username}  setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />} />
                    <Route exact path="/classrooms" element={<ClassroomObjects />} />
                    <Route exact path="/create-classroom" element={<CreateClassroom />} />
                    <Route exact path="/update-classroom" element={<UpdateClassroom setActionButton={setActionButton} />} />
                    <Route exact path="/student" element={<StudentDisplay />} />{" "}
                    <Route exact path="/seating-arrangement" element={<SeatingArrangement />} />{" "}
                    <Route exact path="/new-exam" element= { <NewExam /> } />
                    <Route exact path="/subjects" element= { <Subjects /> } />
                    <Route exact path="/update-subject" element= { <UpdateSubject /> } />
                    <Route exact path="/new-subject" element= { <NewSubject /> } />
                    <Route exact path="/reports" element= { <Reports /> } />
                    <Route exact path="/profile" element= { <Profile /> } />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
              </div>
            </section>
          </main>)
          : ( <Login />)
        }
    </>
  );
};

export default App;
