// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // This is your dashboard view (Navbar, Sidebar, MainContent, etc.)
import CreateClassroomObject from './pages/CreateClassroomObject';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-classroom-object" element={<CreateClassroomObject />} />
    </Routes>
  );
};

export default App;
