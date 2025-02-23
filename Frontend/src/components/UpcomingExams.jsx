// src/components/UpcomingExams.js
import React, { useState } from 'react';

function UpcomingExams() {
  // Sample data for upcoming exams
  const examsData = [
    { id: 1, name: 'Math Exam', date: '2025-01-15' },
    { id: 2, name: 'Physics Exam', date: '2025-01-20' },
    { id: 3, name: 'Chemistry Exam', date: '2025-01-25' },
    { id: 4, name: 'Biology Exam', date: '2025-02-01' },
    { id: 5, name: 'History Exam', date: '2025-02-05' },
    { id: 6, name: 'Geography Exam', date: '2025-02-10' },
  ];

  // Pagination logic for 3 items per page
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(examsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExams = examsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Exam Name</th>
            <th className="text-left p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentExams.map((exam) => (
            <tr key={exam.id} className="border-t">
              <td className="p-2">{exam.name}</td>
              <td className="p-2">{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UpcomingExams;
