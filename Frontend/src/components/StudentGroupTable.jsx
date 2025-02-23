import React from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';
import StudentGroupRow from './StudentGroupRow';

const StudentGroupTable = () => {
  const studentGroups = useStudentGroupStore((state) => state.studentGroups);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-blue-500 text-white">Group Name</th>
            <th className="py-4 px-6 bg-blue-500 text-white">Uploaded Excel Files</th>
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

export default StudentGroupTable;