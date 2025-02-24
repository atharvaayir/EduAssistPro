import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StudentGroupForm from '../components/StudentGroupForm';
import StudentGroupTable from '../components/StudentGroupTable';
import { FaHome, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentInput = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Input</h1>
            <Link to="/" className="btn btn-primary flex items-center">
              <FaHome className="mr-2" /> Home
            </Link>
          </div>
          <div className="mb-6">
            <button className="btn btn-primary flex items-center" onClick={() => setShowForm(true)}>
              <FaPlus className="mr-2" /> Create Student Group
            </button>
          </div>
          <StudentGroupTable />
        </div>
      </div>
      {showForm && <StudentGroupForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default StudentInput;