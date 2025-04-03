import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StudentGroupForm from '../components/StudentGroupForm';
import StudentGroupTable from '../components/StudentGroupTable';
import { FaHome, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const StudentInput = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const semesters = [8, 6, 4, 2];

  useEffect(() => {
    axiosInstance
      .get("/students")
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  // Group students by semester dynamically
  const studentsBySemester = semesters.reduce((acc, sem) => {
    acc[sem] = students.filter(student => student.semester === sem);
    return acc;
  }, {});

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Display</h1>
            <Link to="/" className="btn btn-primary flex items-center">
              <FaHome className="mr-2" /> Home
            </Link>
          </div>

          <div className="grid gap-4">
            {semesters.map((sem) => (
              <div key={sem} className="collapse bg-base-100 border border-base-300">
                <input type="checkbox" id={`sem-${sem}`} />
                <label htmlFor={`sem-${sem}`} className="collapse-title font-semibold text-lg cursor-pointer">
                  Semester {sem}
                </label>

                <div className="collapse-content">
                  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Roll Number</th>
                          <th>Name</th>
                          <th>Subjects</th>
                          <th>Semester</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsBySemester[sem]?.map((student, idx) => (
                          <tr key={student.rollno}>
                            <td>{idx + 1}</td>
                            <td>{student.rollno}</td>
                            <td className="font-semibold">{student.name}</td>
                            <td>
                              {student.subjects.map((subject, sIdx) => (
                                <h1 key={sIdx}>{subject.name}</h1>
                              ))}
                            </td>
                            <td>{student.semester}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && <StudentGroupForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default StudentInput;
