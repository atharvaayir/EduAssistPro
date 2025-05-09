import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from "../../lib/axios";
import toast from 'react-hot-toast'
import { FaSearch } from "react-icons/fa";
const StudentDisplay = () => {
    const semesterRef = useRef(null);
    const departmentRef = useRef(null);

    const [studentData,setStudentData] = useState(null);
    const [warningVisible, setWarningVisible] = useState(false);


    const handleFetchStudents = async (formData) => {
        let students;
        try {
          const res = await axiosInstance.post("/students/", formData);
          console.log(res);
          students = res.data.students;
          if (res.data.message === "success") {
            return "Students loaded successfully!";
          } else if (res.data.message === "No Student Found") {
              throw new Error("No Students found.");
          } else {
            throw new Error("Error occurred during fetching data.");
          }
        } catch (error) {
        //   console.error("Error fetching students:", error);
          throw error; // Re-throw the error to be caught by the toast.promise
        } finally {
            setStudentData(!students ? null : students);
        }
    };
    const fetchStudentsWithToast = async (e) => {
        e.preventDefault();
        const formData = {
            semester: semesterRef.current.value,
            department: departmentRef.current.value,
          };
        if(!formData.semester || isNaN(formData.semester) || Number(formData.semester)<1 || Number(formData.semester)>8){
            toast.error("Semester field is invalid");
            return;
        }
        if(formData.department==="Pick a browser"){
            toast.error("Select a department");
            return;    
        }
        console.log(formData);
        
        toast.promise(
          handleFetchStudents(formData),
          {
            loading: 'Fetching students...',
            success: (message) => message, // The resolved value of the promise is passed here
            error: (error) => `${error.message || 'Failed to fetch students.'}`, // The rejected error is passed here
          }
        );
    };

    const handleSemesterChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const isValid = !isNaN(value) && value >= 1 && value <= 8;
    
        if (isValid) {
          setWarningVisible(false);
          if (semesterRef.current) {
            semesterRef.current.classList.remove('border-red-500');
          }
        } else {
          setWarningVisible(true);
          if (semesterRef.current) {
            semesterRef.current.classList.add('border-red-500');
          }
        }
    };
    
    
  return (
    <div>
        <section className='flex items-end justify-center gap-4 mb-6'>
            <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">Department</legend>
                <select defaultValue="Pick a browser" className="select shadow-lg pr-10" ref={departmentRef}>
                    <option disabled={true}>Pick a browser</option>
                    <option value="civ">CIV</option>
                    <option value="comp">COMP</option>
                    <option value="it">IT</option>
                    <option value="mech">MECH</option>
                    <option value="ee">EnE</option>
                    <option value="etc">ETC</option>
                    <option value="vlsi">VLSI </option>
                </select>
            </fieldset>
            <fieldset className="fieldset relative">
                <legend className="fieldset-legend font-semibold">Semester</legend>
                <input type="number" ref={semesterRef} className={`input shadow-lg w-56 ${warningVisible ? 'border-red-500' : ''}`} required placeholder="Number between 1 to 8" min="1" max="8" title="Must be between be 1 to 10" onChange={handleSemesterChange} />
                <p className={`text-red-500 absolute text-nowrap  ${warningVisible ? 'block' : 'hidden'}`}>
                    Must be between be 1 to 8
                </p>
            </fieldset>
            <button type="button" className='btn btn-primary' onClick={fetchStudentsWithToast}><FaSearch className='size-5' /> </button>
        </section>
        {!studentData ?
            <div className='flex p-16'>
                <h1 className="m-auto">No Student Data</h1>
            </div>
            :
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white/60 shadow-lg shadow-black/20">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Subjects</th>
                            <th>Department</th>
                            <th>Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((student, index) => (
                            <tr key={index} className='hover:bg-neutral-100'> 
                                <td>{index + 1}</td> 
                                <td>{student.name}</td> 
                                <td>{student.subjects.map(subject => `${subject.code} - ${subject.name}`).join(', ')}</td>
                                <td>{student.department.name}</td> 
                                <td>{student.semester}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
    </div>
  )
}

export default StudentDisplay