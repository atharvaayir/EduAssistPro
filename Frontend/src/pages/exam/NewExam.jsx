import React, { useEffect, useState } from 'react'
import PageHeader from "../../components/PageHeader";
import { useExamStore } from '../../store/useExamStore';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Pencil, Plus, PlusIcon, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { DayPicker } from "react-day-picker";
import FormInputBox from '../../components/FormInputBox';
import "react-day-picker/style.css";

const NewExam = () => {
    const { getClassrooms, classrooms, setStage, currentStage, getSubjects,subjects } = useExamStore();

    // const action = <button className="btn btn-primary">Save</button>;

    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [editGroupName, setEditGroupName] = useState("");
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    // Toggle Popup Visibility
    const togglePopup = (e) => {
        e.preventDefault();
        // setIsPopupOpen(!isPopupOpen);
        document.getElementById("classroom-modal").showModal();
    };

    // Handle Classroom Selection
    const handleSelect = (cr) => {
        setSelectedClassrooms((prev) => {
            // Toggle selection
            if (prev.some((selected) => selected._id === cr._id)) {
                return prev.filter((selected) => selected._id !== cr._id);
            } else {
                return [...prev, cr];
            }
        });
    };
    const totalCapacity = selectedClassrooms.reduce((sum, cr) => sum + cr.rows * cr.columns * cr.benchCapacity,0);

    // Handle Next Step
    const handleNext = () => {
        console.log(timetable);
        
        if (currentStage < steps.length - 1) {
            setStage(1);
        }
    };
    // Handle Previous Step
    const handlePrev = () => {
        if (currentStage > 0) {
            setStage(-1);
        }
    };
    const safeGroupName = (name)=>{
        setGroupName(name.trim());
        if (!name) {
            toast.error("Group name cannot be empty");
            return false;
        }

        if (Array.isArray(groups) ) {
            for (let i = 0; i < groups.length; i++) {
                if (typeof groups[i] === 'object' && groups[i] !== null && typeof groups[i].name === 'string' && groups[i].name === name) {
                    toast.error("Group name already used");
                    return false;
                }
              }            
        }
        return true;
    }
    // handle exam group creation
    const createGroup = (e)=>{
        e.preventDefault();
        document.getElementById("create-exam-group-modal").showModal();
    }
    // handle subject group confirmation
    const confirmSubjectGroup = () => {
        if(!safeGroupName(groupName))
        return;
        
        setGroups([...groups, { name: groupName, subjects: [] }]);
        setGroupName("");
        document.getElementById("create-exam-group-modal").close();
        // toast.success("Group created successfully");
        console.log(groups);
    };
    // handle Subject Group name Edit
    const handleSubjectGroupEdit = (e,index)=>{
        e.preventDefault();
        setEditGroupName(groups[index].name);
        document.getElementById("edit-exam-group-modal").showModal();
        setSelectedGroupIndex(index);
    }
    const confirmSubjectGroupEdit = (e)=>{
        // e.preventDefault();
        if(!safeGroupName(editGroupName))
        return;
        setGroups(prevGroups => {
            return prevGroups.map((group, index) =>
                index === selectedGroupIndex ? { ...group, name: editGroupName } : group
            );
        });
    
        setGroupName("");
    }

    // check if subject is already chosen
    const safeSubject = (subject) => {
        if (groups.some((group) => group.subjects.includes(subject))) 
            return false;
        return true;
    }
    // handle add subject button
    const addSubjectHandle = (e,index)=>{
        e.preventDefault();
        document.getElementById("subjects-display-modal").showModal();
        setSelectedGroupIndex(index);
    }
    const handleSelectSubject = (e,subject)=>{
        e.preventDefault();
        if(!safeSubject(subject)){
            toast.error("Subject already chosen");
            return;
        }
        setGroups(prevGroups => {
            return prevGroups.map((group, index) =>
                index === selectedGroupIndex ? { ...group, subjects: [...group.subjects, subject] } : group);
        });
    }

    const handleGroupDelete = (e,index)=>{
        e.preventDefault();
        setSelectedGroupIndex(index);
        document.getElementById("delete-exam-group-modal").showModal();
    }
    const confirmSubjectGroupDelete = (e)=>{
        // e.preventDefault();
        setGroups(prevGroups => prevGroups.filter((group, index) => index !== selectedGroupIndex));
        setSelectedGroupIndex(null);
    }

    const steps = ["Exam Info and Subjects", "Time Table Creation", "Step 3", "Student Input", "Step 5"]; // Define steps

    useEffect(() => {
        getClassrooms();
        getSubjects();
    }, []);

    const subjects_ = ["Math", "Physics", "Chemistry", "Biology", "English"];
    const students = {
        Math: ["A", "B", "C"],
        Physics: ["B", "C"],
        Chemistry: ["A", "C"],
        Biology: ["A", "B"],
        English: ["C"],
    };

    const [timetable, setTimetable] = useState([]);

    const handleChange = (subject, field, value) => {
        setTimetable((prev) => {
            const updated = prev.map((entry) =>
              entry.subject === subject ? { ...entry, [field]: value } : entry
            );
            return updated.some((e) => e.subject === subject)
              ? updated
              : [...updated, { subject, date: "",  students: students[subject] }];
          });
    };
  
    const checkConflicts = (e) => {
        e.preventDefault();
        const scheduleMap = new Map(); // Stores { date -> Set of students }

        for (const { date, students } of timetable) {
            console.log(timetable);
            
          if (!date) continue;
          if (!scheduleMap.has(date)) scheduleMap.set(date, new Set());
    
          const studentSet = scheduleMap.get(date);
          for (const student of students) {
            if (studentSet.has(student)) {
              alert(`⚠️ Conflict: Student ${student} has two exams on ${date}`);
              return false;
            }
            studentSet.add(student);
          }
        }
    
        alert("✅ No conflicts found!");
        return true;
    
    };

    return (
        <>
            <PageHeader heading="New Exam"  />
            <div className='w-7/8 mx-auto'>
              <div className="mb-4 flex justify-end gap-3">
                  <button
                      className="btn btn-primary"
                      onClick={handlePrev}
                      disabled={currentStage === 0}
                  >
                      Previous
                  </button>
                  <button
                      className="btn btn-primary"
                      onClick={handleNext}
                      disabled={currentStage === steps.length - 1}
                  >
                      {currentStage === steps.length - 1 ? "Finish" : "Next"}
                  </button>
              </div>
              <form className="space-y-6">
                  {/* 🚀 Stepper Progress Bar */}
                  <FormInputBox>
                      <div className="flex items-center justify-between mb-6">
                          {steps.map((step, index) => (
                              <div key={index} className="flex flex-col items-center w-full">
                                  {/* 🚀 Line Between Steps */}
                                  {index >= 0 && (
                                      <div
                                          className={`h-1 w-full transition-all duration-500 ${
                                              index <= currentStage ? "bg-primary" : "bg-gray-300"
                                          }`}
                                      />
                                  )}
                                  {/* 🚀 Bob (Step Circle) */}
                                  <div className='translate-y-2 w-full flex flex-col'>
                                      <div
                                          className={`w-10 h-10 flex items-center mx-auto justify-center rounded-full font-bold text-white transition-all duration-300 ${
                                              index <= currentStage ? "bg-primary scale-110" : "bg-gray-300"
                                          }`}
                                      >
                                          {index + 1}
                                      </div>
                                      {/* 🚀 Step Name */}
                                      <p className="mt-2 text-sm font-semibold text-center">{step}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </FormInputBox>
                  {/* Page 1 */}
                  {currentStage === 0 && (
                        <section>
                            <FormInputBox>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="exam-name" className="text-lg font-semibold">
                                        Exam Name:
                                    </label>
                                    <input type="text" name="exam-name" id="exam-name" className="input input-bordered w-full" placeholder="Enter exam name" />
                                </div>
                            </FormInputBox>
                            
                            {/* Classroom Selection Section */}
                            <FormInputBox>
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold">
                                        Select Classrooms:
                                    </label>
                                    {/* Trigger Button */}
                                    <button onClick={togglePopup} className="btn btn-primary w-full">
                                        Select Classrooms
                                    </button>
                                    {/* Display Selected Classrooms & Capacity */}
                                    <div className="p-3 bg-gray-100 rounded-lg border">
                                        <p>
                                            <strong>Selected:</strong>{" "}
                                            {selectedClassrooms.length > 0 ? selectedClassrooms .map((cr) => cr.name) .join(", ") : "None"}
                                        </p>
                                        <p>
                                            <strong>Total Capacity:</strong>{" "}
                                            {totalCapacity}
                                        </p>
                                    </div>
                                </div>
                            </FormInputBox>

                            {/* Subjects Input */}
                            <FormInputBox>
                                <label className="text-lg flex items-center justify-between font-semibold">
                                    <h1>
                                        Subjects Input:
                                    </h1>
                                    <button className="btn btn-primary" onClick={createGroup}> <Plus /> Create Group </button>
                                </label>
                                {
                                    groups.length > 0 ? 
                                    <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th>Group Name</th>
                                            <th>Subjects</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                groups.map(((group,index)=>(
                                                <tr key={group}>
                                                    <td>{group.name}</td>
                                                    <td>
                                                        {group.subjects.map(subject=>(<div>{subject.code} - {subject.name}</div>))}
                                                    </td>
                                                    <td>
                                                    <button className='btn btn-primary mr-3' onClick={(e)=>addSubjectHandle(e,index)}>
                                                        <PlusIcon className='size-4' /> Subject
                                                    </button>
                                                    <button className='btn btn-accent mr-3' onClick={(e)=>handleSubjectGroupEdit(e,index)}>
                                                        <Pencil className='size-4' /> Edit Name
                                                    </button>
                                                    <button className='btn btn-secondary' onClick={(e)=>{handleGroupDelete(e,index)}}>
                                                        <Trash className='size-4'/> Delete
                                                    </button>
                                                    </td>
                                                </tr>
                                            )))
                                        }
                                        </tbody>
                                    </table>
                                    </div>
                                    :
                                    <h1 className='text-sm text-gray-400'>
                                        No Groups Created
                                    </h1>
                                }
                            </FormInputBox>
                        </section>
                  )}
                  {currentStage === 1 && 
                    <section>
                        <div className="p-5">
                            <h2 className="text-2xl font-bold mb-4">Exam Timetable</h2>
                            <div className="overflow-x-auto">
                                <table className="table w-full border rounded-lg">
                                <thead>
                                    <tr className="bg-gray-200">
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groups.map((batch) =>
                                    batch.subjects.map((subject) => (
                                        <tr key={subject._id} className="border">
                                        <td className="p-2">{subject.name}</td>
                                        <td>
                                            <input
                                            type="date"
                                            className="input input-bordered"
                                            onChange={(e) => handleChange(subject._id, "date", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                            type="time"
                                            className="input input-bordered"
                                            onChange={(e) => handleChange(subject._id, "startTime", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                            type="time"
                                            className="input input-bordered"
                                            onChange={(e) => handleChange(subject._id, "endTime", e.target.value)}
                                            />
                                        </td>
                                        </tr>
                                    ))
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </section>}
                  {currentStage === 2 && 
                        <section>
                            
                        </section>}
                  {currentStage === 3 && <section>stage 4</section>}
              </form>
            </div>
            {currentStage === steps.length-1 && 
                <div className='flex'>
                    <button className="btn btn-primary mx-auto w-50 text-lg font-bold">Save</button>
                </div>
            }
            {/* Modal Popup for Classrooms */}
            <dialog id="classroom-modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl mb-4">
                        Select Classrooms
                    </h3>
                    {/* Classroom Buttons Grid (Scrollable) */}
                    <div className="p-4 grid grid-cols-4 gap-3 max-h-[20rem] overflow-auto">
                        {classrooms.map((cr) => (
                            <button
                                key={cr._id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(cr);
                                }}
                                className={`btn h-fit py-4 ${
                                    selectedClassrooms.some(
                                        (selected) => selected._id === cr._id
                                    )
                                        ? "btn-success"
                                        : "btn-outline"
                                }`}
                            >
                                <p className="text-2xl truncate w-full">
                                    {cr.name}
                                </p>
                                <p className="text-md">
                                    Capacity:{" "}
                                    {cr.rows * cr.columns * cr.benchCapacity}
                                </p>
                            </button>
                        ))}
                    </div>
                    {/* Modal Close Button */}
                    <div className="modal-action">
                        <form method="dialog" className="w-full flex">
                            <button className="btn btn-primary mx-auto px-8 font-bold text-lg">
                                Done
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="create-exam-group-modal" className="modal">
                <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="font-bold text-lg">Create New Subject Group</h3>
                <input
                    type="text"
                    className="input input-bordered w-full mt-6"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter exam group name"
                />
                    
                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button
                        className="btn btn-primary font-bold mr-5"
                        onClick={confirmSubjectGroup}
                    >
                        Create
                    </button>
                    <button className="btn bg-red-400 hover:bg-red-500 font-bold">
                        Cancel
                    </button>
                    </form>
                </div>
                </div>
            </dialog>
            <dialog id="edit-exam-group-modal" className="modal">
                <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="font-bold text-lg">Edit Subject Group</h3>
                <input
                    type="text"
                    className="input input-bordered w-full mt-6"
                    value={editGroupName}
                    onChange={(e) => setEditGroupName(e.target.value)}
                    placeholder="Enter exam group name"
                />
                    
                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button
                        className="btn btn-primary font-bold mr-5"
                        onClick={confirmSubjectGroupEdit}
                    >
                        Update
                    </button>
                    <button className="btn bg-red-400 hover:bg-red-500 font-bold">
                        Cancel
                    </button>
                    </form>
                </div>
                </div>
            </dialog>
            <dialog id="subjects-display-modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl mb-4">
                        Select Subject
                    </h3>
                    {/* Classroom Buttons Grid (Scrollable) */}
                    <div className="p-4 grid grid-cols-2 gap-3 max-h-[20rem] overflow-auto">
                        {subjects.map((subject) => (
                            <button
                                key={subject._id}
                                onClick={(e) => handleSelectSubject(e,subject)}
                                className="btn h-fit py-4"
                            >
                                <p className="text-2xl truncate w-full">
                                    {subject.name}
                                </p>
                                <p className="text-md">
                                    Code:{" "}
                                    {subject.code}
                                </p>
                            </button>
                        ))}
                    </div>
                    {/* Modal Close Button */}
                    <div className="modal-action">
                        <form method="dialog" className="w-full flex">
                            <button className="btn btn-primary mx-auto px-8 font-bold text-lg">
                                Done
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="delete-exam-group-modal" className="modal">
                <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="font-bold text-lg">Delete Subject Group</h3>
                <p>
                    Are you sure you want to delete "{selectedGroupIndex!==null && groups[selectedGroupIndex].name}" subject group?
                </p>
                    
                <div className="modal-action">
                    <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button
                        className="btn btn-primary font-bold mr-5"
                        onClick={confirmSubjectGroupDelete}
                    >
                        Delete
                    </button>
                    <button className="btn bg-red-400 hover:bg-red-500 font-bold">
                        Cancel
                    </button>
                    </form>
                </div>
                </div>
            </dialog>
        </  >
    );
};

export default NewExam;

