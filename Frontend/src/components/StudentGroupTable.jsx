import React from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';
import StudentGroupRow from './StudentGroupRow';

const StudentGroupTable = () => {
  const studentGroups = useStudentGroupStore((state) => state.studentGroups);

  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Group Name</th>
            <th style={headerCellStyle}>Uploaded Excel Files</th>
          </tr>
        </thead>
        <tbody>
          {studentGroups.map((group) => (
            <StudentGroupRow key={group.id} group={group} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableContainerStyle = {
  overflowX: 'auto',
};

const tableStyle = {
  minWidth: '100%',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '0.375rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const headerCellStyle = {
  padding: '0.75rem',
  textAlign: 'left',
  backgroundColor: '#3490dc',
  color: 'white',
  fontWeight: 'bold',
};

export default StudentGroupTable;