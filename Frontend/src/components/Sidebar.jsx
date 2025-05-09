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
<div
  className={`relative bg-blue-50 border border-blue-300 rounded-tr-xl h-full max-h-full 
    transition-[width] duration-300 ease-in-out overflow-hidden
    ${collapsed ? 'w-[60px]' : 'w-[250px]'}`}
>
  {/* Toggle Button */}
  <div
    onClick={toggleSidebar}
    className="flex p-2 absolute bottom-2 cursor-pointer left-2 hover:bg-blue-300 rounded-lg transition-colors duration-100"
  >
    <button onClick={toggleSidebar}>
      {collapsed ? <SidebarOpen /> : <SidebarClose />}
    </button>
  </div>

  <div className="flex flex-col items-center">
    <div className="w-full pt-4">
      {[
        { to: "/", icon: <FaHome />, label: "Home" },
        { to: "/new-exam", icon: <FaPlus />, label: "New Exam" },
        { to: "/classrooms", icon: <FaCube />, label: "Classrooms" },
        { to: "/seating-arrangement", icon: <FaChalkboard />, label: "Seating Arrangement" },
        { to: "/subjects", icon: <PiBooks className="size-5" />, label: "Subjects" },
        { to: "/student", icon: <IoPeople className="size-5" />, label: "Students" },
        { to: "/reports", icon: <FaChartBar />, label: "Reports" },
        { to: "/profile", icon: <FaUser />, label: "Profile" }
      ].map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className="w-full text-left px-4 py-2 hover:bg-blue-300 flex items-center relative"
        >
          <span className="mr-2">{icon}</span>
          <span
            className={`transition-all duration-300 origin-left whitespace-nowrap
              ${collapsed ? 'scale-x-0' : ' scale-x-100 ml-1'}`}
          >
            {label}
          </span>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
}

export default Sidebar;
