// src/components/Navbar.js
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar({ adminName }) {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-bold">
        EduAssistPro
      </div>

      {/* Center: Admin Name */}
      <div className="text-xl font-medium">
        {adminName}
      </div>

      {/* Right: Logout Button */}
      <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded focus:outline-none">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </nav>
  );
}

export default Navbar;
