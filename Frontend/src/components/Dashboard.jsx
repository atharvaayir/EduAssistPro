import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StatisticsBox from "./StatisticsBox";
import UpcomingExams from "./UpcomingExams";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = ({ username, setIsAuthenticated }) => {
  const toastShown = useRef(false); // Keeps track of whether the toast has been shown

  useEffect(() => {
    if (!toastShown.current) {
      toast.success("Login Successful");
      toastShown.current = true;
    }
  }, []);
  return (
    <>
      {/* Statistics Box */}
      <div className="mb-6">
        <StatisticsBox />
      </div>

      {/* Upcoming Exams */}
      <div className="mb-6">
        <UpcomingExams />
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/student-input"
          className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50"
        >
          <button>Student Data</button>
        </Link>
        <Link
          to="/classrooms"
          className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50"
        >
          <button className="">Classroom Data</button>
        </Link>
        <Link
          to="/new-exam"
          className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50"
        >
          New Exam
        </Link>
        <button className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50">
          Queries
        </button>
      </div>
    </>

  );
};

export default Dashboard;
