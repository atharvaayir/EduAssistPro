// src/components/Sidebar.js
import React, { useState } from 'react';
import { FaUser, FaClipboardList, FaChalkboard, FaFilePdf, FaMailBulk, FaChartBar, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <div className="flex p-2">
        <button onClick={toggleSidebar} className="text-blue-700 focus:outline-none bg-blue-100/10 p-2 rounded-full mr-auto">
          {/* {collapsed ? <FaChevronRight /> : <FaChevronLeft />} */}
          <Menu />
        </button>
      </div>

      {/* Admin Image */}
      <div className="flex flex-col items-center">
        {/* added the same image in the profile icons */}
        {/* <img src="/images/raj.png" alt="Admin" className="rounded-full mb-4"/> */}

        {/* Navigation Buttons */}
          <div className="w-full">
            <Link to="/" className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaHome className="mr-2" />  {!collapsed && ("Home")}
            </Link>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaUser className="mr-2" />  {!collapsed && ("Profile")}
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaClipboardList className="mr-2" />  {!collapsed && ("Exam Management")}
            </button>
            <Link to="/seating-arrangement  " className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaChalkboard className="mr-2" />  {!collapsed && ("Seating Arrangement")}
            </Link>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaFilePdf className="mr-2" />  {!collapsed && ("PDF Generation")}
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaMailBulk className="mr-2" />  {!collapsed && ("Mailing")}
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
              <FaChartBar className="mr-2" />  {!collapsed && ("Reports")}
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
