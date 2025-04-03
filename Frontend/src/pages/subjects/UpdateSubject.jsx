import { ArrowBigLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { axiosInstance } from '../../lib/axios';
import { useSubjectStore } from '../../store/useSubjectStore';

const UpdateSubject = () => {
    const subjectId = useLocation().state? useLocation().state.id:0;
    const navigate = useNavigate();
    if(subjectId===0){
        navigate("/subjects");
    }
    else{
      console.log(subjectId);
    }
    
    const action = (<Link to='/subjects' className='btn btn-primary'>
        <ArrowBigLeft /> Back
    </Link>);
    const { updateSubject } = useSubjectStore();
    // const { id:subjectId } = useParams(); // Get subject ID from URL
    //   console.log(useParams());
      
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
    name: "",
    department: "",
    code: "",
    semester: "",
    });
    
    
    // Fetch departments
    useEffect(() => {
    axiosInstance
        .get("/departments")
        .then((res) => setDepartments(res.data))
        .catch((err) => console.error("Error fetching departments:", err));
      axiosInstance.get(`/subjects/${subjectId}`).then(res=>setFormData(res.data));
    }, []);

    // Fetch existing subject details
    useEffect(() => {
    axiosInstance
        .get(`/subjects/${subjectId}`)
        .then((res) => setFormData(res.data)) // Set form data with fetched subject
        .catch((err) => console.error("Error fetching subject:", err));
        console.log("useEffect", subjectId);
    }, [subjectId]);

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    updateSubject(subjectId, formData, navigate);
    };

  return (
    <div>
        <PageHeader heading="Update Subject" action={action} />
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
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
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
          <button type="submit" className="btn btn-primary w-full">
            Update Subject
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateSubject