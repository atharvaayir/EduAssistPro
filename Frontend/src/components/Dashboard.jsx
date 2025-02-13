import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from 'react';

const Dashboard = () => {
  const toastShown = useRef(false); // Keeps track of whether the toast has been shown

  useEffect(() => {
    if (!toastShown.current) {
      toast.success("Login Successful");
      toastShown.current = true;
    }
    }, []);
  return (
    <>
    <Toaster/>
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
    </>
  );
};

export default Dashboard;
