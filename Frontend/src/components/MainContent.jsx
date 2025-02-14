// src/components/MainContent.js
import React from 'react';
import { Link } from 'react-router-dom';
import StatisticsBox from './StatisticsBox';
import UpcomingExams from './UpcomingExams';

function MainContent() {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
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
        <button className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50">
          Student Data
        </button>
        <Link 
        to="/classroom-object"
        className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50"
      >
        <button className="">
          Classroom Data
        </button>
        </Link>
        <button className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50">
          Generate Timetable
        </button>
        <button className="bg-white shadow rounded p-4 flex items-center justify-center hover:bg-blue-50">
          Queries
        </button>
      </div>
    </div>
  );
}

export default MainContent;
