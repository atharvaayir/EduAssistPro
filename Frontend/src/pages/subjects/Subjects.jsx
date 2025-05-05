import React, { useEffect, useState } from 'react'
import { useSubjectStore } from '../../store/useSubjectStore'
import { Pencil, Plus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';
const Subjects = () => {
  const navigate = useNavigate();
  const {getSubjects,subjects,deleteSubject} = useSubjectStore();

  useEffect(()=>{
    getSubjects();
    const message = localStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("toastMessage");
    }
  },[]);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");

  function handleEdit(id){    
    navigate("/update-subject", { state: { id: id } });
  }
  function handleDelete(id,name){
    document.getElementById("deleteModal").showModal();
    setDeleteName(name);
    setDeleteId(id);
  }
  function confirmDelete(){
    deleteSubject(deleteId);
  }

  const action = (<button className='btn btn-primary' onClick={()=>navigate('/new-subject')}>
    <Plus /> New Subject
  </button>);

  return (
    <>
      <PageHeader heading="Subjects" action={action} />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white/60 shadow-lg shadow-black/20">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Semester</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="hover:bg-gray-50">
                <td className="p-3 border">{subject.code}</td>
                <td className="p-3 border">{subject.semester}</td>
                <td className="p-3 border">{subject.name}</td>
                <td className="p-3 border">{subject.department.name}</td>
                <td className="p-3 border">
                  <button className='btn btn-accent mr-3' onClick={()=>handleEdit(subject._id)}>
                    <Pencil className='size-4' /> Edit
                  </button>
                  <button className='btn btn-secondary' onClick={()=>{handleDelete(subject._id,subject.name)}}>
                    <Trash className='size-4'/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <dialog id="deleteModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">
            Are you sure you want to delete "{deleteName}" Classroom?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn btn-primary font-bold mr-5"
                onClick={confirmDelete}
              >
                Proceed
              </button>
              <button className="btn bg-red-400 hover:bg-red-500 font-bold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  )
}

export default Subjects