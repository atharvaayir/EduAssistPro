// src/components/Sidebar.js
import React, { useState } from 'react';
import { FaUser, FaClipboardList, FaChalkboard, FaFilePdf, FaMailBulk, FaChartBar, FaHome, FaCube, FaPlus, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { PiBooks } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { SidebarClose, SidebarOpen } from 'lucide-react';
import { IoPeople } from "react-icons/io5";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`relative bg-blue-50 border border-blue-300 rounded-tr-xl h-full max-h-full ${collapsed ? 'w-[60px]' : 'w-[250px]'} transition-all duration-300`}>
      {/* Toggle Button */}
      <div onClick={toggleSidebar} className="flex p-2 absolute bottom-2 cursor-pointer left-2 hover:bg-blue-300 rounded-lg transition-colors duration-100">
        <button onClick={toggleSidebar}>
          {collapsed ? <SidebarOpen /> : <SidebarClose/>}
        </button>
      </div>
      <div className="flex flex-col items-center">
        {/* Navigation Buttons */}
        <div className="w-full pt-4">
          <Link to="/" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaHome className="mr-2" /> {!collapsed && ("Home")}
          </Link>
          <Link to="/new-exam" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaPlus className="mr-2" /> {!collapsed && ("New Exam")}
          </Link>
          <Link to="/classrooms" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaCube className="mr-2" /> {!collapsed && ("Classrooms")}
          </Link>
          <Link to="/seating-arrangement  " className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaChalkboard className="mr-2" /> {!collapsed && ("Seating Arrangement")}
          </Link>
          <Link to="/subjects" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <PiBooks className="mr-2 size-5" /> {!collapsed && ("Subjects")}
          </Link>
          <Link to="/student" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <IoPeople className="mr-2 size-5" /> {!collapsed && ("Students")}
          </Link>
          <Link to="/reports" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaChartBar className="mr-2" /> {!collapsed && ("Reports")}
          </Link>
          <Link to="/profile" className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center">
            <FaUser className="mr-2" /> {!collapsed && ("Profile")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
