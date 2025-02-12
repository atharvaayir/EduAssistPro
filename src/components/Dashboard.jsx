// src/components/Dashboard.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <Navbar adminName="Admin Name" />

      {/* Main Dashboard Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
