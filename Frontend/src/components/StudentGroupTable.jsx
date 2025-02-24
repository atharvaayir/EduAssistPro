import React, { useState } from 'react';
import { useStudentGroupStore } from '../store/StudentGroupStore';
import StudentGroupRow from './StudentGroupRow';

const StudentGroupTable = () => {
  const studentGroups = useStudentGroupStore((state) => state.studentGroups);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust this value based on the desired number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(studentGroups.length / itemsPerPage);

  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentGroups.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
          {currentItems.map((group) => (
            <StudentGroupRow key={group.id} group={group} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default StudentGroupTable;