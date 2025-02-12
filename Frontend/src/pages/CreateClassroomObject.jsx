// src/pages/CreateClassroomObject.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CreateClassroomObject = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create Classroom Object</h1>
      <p className="mb-6">This is the page where you can create and manage classroom data.</p>
      <Link 
        to="/"
        className="text-blue-600 hover:underline"
      >
        &larr; Back to Dashboard
      </Link>
    </div>
  );
};

export default CreateClassroomObject;
