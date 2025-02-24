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
      <tr className="border-b">
        <td className="p-4">
          {group.name}
          <div className="flex gap-2 mt-2">
            <button className="btn btn-sm btn-primary" onClick={() => setShowEditOverlay(true)}><FaEdit /> Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteStudentGroup(group.id)}><FaTrash /> Delete</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowUploadOverlay(true)}><FaUpload /> Upload</button>
          </div>
        </td>
        <td className="p-4">
          <div className="flex flex-wrap gap-2">
            {group.files.map((file) => (
              <div key={file} className="flex items-center gap-2 bg-gray-200 p-2 rounded">
                {file} <button className="btn btn-xs btn-danger" onClick={() => deleteFileFromGroup(group.id, file)}>x</button>
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

export default StudentGroupRow;