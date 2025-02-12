// src/components/StatisticsBox.js
import React from 'react';

function StatisticsBox() {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <div className="text-lg font-medium">Total Students</div>
          <div className="text-2xl font-bold">500</div>
        </div>
        <div className="p-4 bg-blue-100 rounded">
          <div className="text-lg font-medium">Total Pending Queries</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsBox;
