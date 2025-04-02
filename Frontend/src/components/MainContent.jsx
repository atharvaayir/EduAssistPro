// Frontend/src/components/MainContent.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import CreateClassroom from "../pages/classroom/CreateClassroom";
import ClassroomObjects from "../pages/classroom/ClassroomObjects";
import UpdateClassroom from "../pages/classroom/UpdateClassroom";
import Blocks from "../pages/Blocks";
import StudentInput from "../pages/StudentInput"; // Import the new page
import NewExam from "../pages/exam/NewExam";
import SeatingArrangement from "../pages/SeatingArrangement";
import Dashboard from "./Dashboard";
function MainContent({username,isAuthenticated,setIsAuthenticated}) {
  return (
    <></>
  );
}

export default MainContent;
