import React, { useState } from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';
import { FaPlus } from 'react-icons/fa';

const StudentGroupForm = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');
  const addStudentGroup = useStudentGroupStore((state) => state.addStudentGroup);

  const handleSubmit = () => {
    addStudentGroup({ id: Date.now(), name: groupName, files: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">New Student Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Student Group Name"
          className="input input-bordered w-full mb-4"
        />
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}><FaPlus className="mr-2" /> Create</button>
        </div>
      </div>
    </div>
  );
};

export default StudentGroupForm;