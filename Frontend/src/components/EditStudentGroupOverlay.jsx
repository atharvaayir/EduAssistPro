import React, { useState } from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';

const EditStudentGroupOverlay = ({ groupId, currentName, onClose }) => {
  const [newName, setNewName] = useState(currentName);
  const updateStudentGroup = useStudentGroupStore((state) => state.updateStudentGroup);

  const handleSave = () => {
    updateStudentGroup(groupId, newName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Student Group</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Student Group Name"
          className="input input-bordered w-full mb-4"
        />
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentGroupOverlay;