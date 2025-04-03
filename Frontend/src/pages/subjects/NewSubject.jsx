import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { ArrowBigLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { useSubjectStore } from '../../store/useSubjectStore';

const NewSubject = () => {
    const navigate = useNavigate();
    const {createSubject} = useSubjectStore();

    const action = (<Link to='/subjects' className='btn btn-primary'><ArrowBigLeft /> Back </Link>);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [departments,setDepartments] = useState([]);
    useEffect(() => {
        axiosInstance.get('/departments')
          .then((res) => setDepartments(res.data))
          .catch((err) => console.error("Error fetching departments:", err));
      }, []); // Runs only once on component mount
      
    

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    code: "",
    semester: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createSubject(formData,navigate);
  };

  return (
    <div>
        <PageHeader heading="New Subject" action={action} />
        <div className="w-2/3 mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject Name */}
                <div>
                    <label className="block text-sm font-medium">Subject Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Department */}
                <div>
                    <label className="block text-sm font-medium">Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Select a department</option>
                        {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                {/* Code */}
                <div>
                    <label className="block text-sm font-medium">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Semester */}
                <div>
                    <label className="block text-sm font-medium">Semester</label>
                    <input
                        type="number"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        min="1"
                        max="8"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">Add Subject</button>
            </form>
        </div>
    </div>
  )
}

export default NewSubject