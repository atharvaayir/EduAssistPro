// src/components/Sidebar.js
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaUser, FaClipboardList, FaChalkboard, FaFilePdf, FaMailBulk, FaChartBar } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Admin Image */}
      <div className="flex flex-col items-center">
        <img
          src="/images/raj.png"
          alt="Admin"
          className="rounded-full mb-4"
        />

        {/* Navigation Buttons */}
        {!collapsed && (
          <div className="w-full">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaUser className="mr-2" /> Profile
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaClipboardList className="mr-2" /> Exam Management
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaChalkboard className="mr-2" /> Seating Arrangement
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaFilePdf className="mr-2" /> PDF Generation
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaMailBulk className="mr-2" /> Mailing
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaChartBar className="mr-2" /> Reports
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
