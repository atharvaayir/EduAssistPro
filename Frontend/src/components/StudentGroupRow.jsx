import React, { useState } from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import UploadFileOverlay from './UploadFileOverlay';
import EditStudentGroupOverlay from './EditStudentGroupOverlay';

const StudentGroupRow = ({ group }) => {
  const [showUploadOverlay, setShowUploadOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const deleteStudentGroup = useStudentGroupStore((state) => state.deleteStudentGroup);
  const deleteFileFromGroup = useStudentGroupStore((state) => state.deleteFileFromGroup);

  return (
    <>
      <tr style={rowStyle}>
        <td style={cellStyle}>
          {group.name}
          <div style={buttonGroupStyle}>
            <button style={iconButtonStyle} onClick={() => setShowEditOverlay(true)}><FaEdit /> Edit</button>
            <button style={iconButtonStyle} onClick={() => deleteStudentGroup(group.id)}><FaTrash /> Delete</button>
            <button style={iconButtonStyle} onClick={() => setShowUploadOverlay(true)}><FaUpload /> Upload</button>
          </div>
        </td>
        <td style={cellStyle}>
          <div style={fileContainerStyle}>
            {group.files.map((file) => (
              <div key={file} style={fileBoxStyle}>
                {file} <button style={deleteFileButtonStyle} onClick={() => deleteFileFromGroup(group.id, file)}>x</button>
              </div>
            ))}
          </div>
        </td>
      </tr>
      {showUploadOverlay && <UploadFileOverlay groupId={group.id} onClose={() => setShowUploadOverlay(false)} />}
      {showEditOverlay && <EditStudentGroupOverlay groupId={group.id} currentName={group.name} onClose={() => setShowEditOverlay(false)} />}
    </>
  );
};

const rowStyle = {
  borderBottom: '1px solid #ccc',
};

const cellStyle = {
  padding: '0.75rem',
  textAlign: 'left',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginTop: '0.5rem',
};

const iconButtonStyle = {
  backgroundColor: '#3490dc',
  color: 'white',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const fileContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
};

const fileBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#f1f1f1',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
};

const deleteFileButtonStyle = {
  backgroundColor: '#e3342f',
  color: 'white',
  padding: '0.25rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
};

export default StudentGroupRow;