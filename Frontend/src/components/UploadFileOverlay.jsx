import React, { useState } from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';

const UploadFileOverlay = ({ groupId, onClose }) => {
  const [file, setFile] = useState(null);
  const addFileToGroup = useStudentGroupStore((state) => state.addFileToGroup);

  const handleFileUpload = () => {
    if (file) {
      addFileToGroup(groupId, file.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="input input-bordered w-full mb-4" />
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleFileUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileOverlay;