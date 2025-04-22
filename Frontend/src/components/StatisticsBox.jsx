// src/components/StatisticsBox.js
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function StatisticsBox() {
  const [studentCount, setStudentCount] = useState(0); 
  const [examCount, setExamCount] = useState(0); 
  useEffect(()=>{
    // Example API Call to Fetch Student Count
    axiosInstance.get("/students/count")
      .then((res) => {setStudentCount(res.data.count)})
      .catch((err) => toast.error("Failed to fetch student count"));
    axiosInstance.get("/exams/count")
      .then((res) => {setExamCount(res.data.count);})
      .catch((err) => toast.error("Failed to fetch student count"));
  },[]);
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <div className="text-lg font-medium">Total Students</div>
          <div className="text-2xl font-bold">{studentCount}</div>
        </div>
        <div className="p-4 bg-blue-100 rounded">
          <div className="text-lg font-medium">Total Exam Conducted</div>
          <div className="text-2xl font-bold">{examCount}</div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsBox;
