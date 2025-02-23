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
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <Navbar />
        <div style={contentContainerStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Student Input</h1>
            <Link to="/" style={homeButtonStyle}>
              <FaHome /> Home
            </Link>
          </div>
          <div style={createButtonContainerStyle}>
            <button style={createButtonStyle} onClick={() => setShowForm(true)}>
              <FaPlus /> Create Student Group
            </button>
          </div>
          <StudentGroupTable />
        </div>
      </div>
      {showForm && <StudentGroupForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
};

const mainContentStyle = {
  flex: 1,
};

const contentContainerStyle = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '2rem',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
};

const homeButtonStyle = {
  backgroundColor: '#3490dc',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  textDecoration: 'none',
};

const createButtonContainerStyle = {
  margin: '1rem 0',
};

const createButtonStyle = {
  backgroundColor: '#3490dc',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
};

export default StudentInput;