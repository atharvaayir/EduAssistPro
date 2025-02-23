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
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={modalTitleStyle}>New Student Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Student Group Name"
          style={inputStyle}
        />
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
          <button style={createButtonStyle} onClick={handleSubmit}>
            <FaPlus style={iconStyle} /> Create
          </button>
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
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '0.375rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const modalTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const inputStyle = {
  border: '1px solid #ccc',
  padding: '0.5rem',
  marginBottom: '1rem',
  width: '100%',
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

const createButtonStyle = {
  backgroundColor: '#3490dc',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '0.5rem',
};

export default StudentGroupForm;