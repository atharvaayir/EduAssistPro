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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={modalTitleStyle}>Upload Files</h2>
          <button style={closeButtonStyle} onClick={onClose}>×</button>
        </div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} />
        <div style={fileInfoStyle}>
          {file && <span>{file.name}</span>}
        </div>
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
          <button style={uploadButtonStyle} onClick={handleFileUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '0.375rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  width: '400px',
  maxWidth: '90%',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  paddingBottom: '0.5rem',
  marginBottom: '1rem',
};

const modalTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const inputStyle = {
  border: '1px solid #ccc',
  padding: '0.5rem',
  marginBottom: '1rem',
  width: '100%',
};

const fileInfoStyle = {
  marginBottom: '1rem',
  fontSize: '0.875rem',
  color: '#555',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const cancelButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  border: 'none',
};

const uploadButtonStyle = {
  backgroundColor: '#3490dc',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  border: 'none',
};

export default UploadFileOverlay;