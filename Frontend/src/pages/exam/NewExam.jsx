import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useExamStore } from "../../store/useExamStore";
import { FaArrowLeft, FaArrowRight, FaCube } from "react-icons/fa";
import { Pencil, Plus, PlusIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import FormInputBox from "../../components/FormInputBox";
import "react-day-picker/style.css";
import { FaShuffle } from "react-icons/fa6";
import { BiGridVertical } from "react-icons/bi";

const NewExam = () => {
  const {
    isLoading,
    getAllData,
    classrooms,
    setStage,
    currentStage,
    subjects,
    invigilators,
    seatingArrangementBackendCall,
    seatingArrangementData,
  } = useExamStore();

  // const action = <button className="btn btn-primary">Save</button>;

  const [selectedClassrooms, setSelectedClassrooms] = useState([]);
  const [selectedInvigilators, setSelectedInvigilators] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [timeTableDisabled, setTimeTableDisabled] = useState(false);
  const [seatingArrangementSelectedChoice, setSeatingArrangementSelectedChoice] = useState("choice1");
//   const [groups, setGroups] = useState([]);
  const [groups, setGroups] = useState([
    {
        "name": "BE COMP",
        "subjects": [
            {
                "_id": "67ece4e4fd7965f808ff5907",
                "name": "Cryptography Techniques for Network Security",
                "code": "CE810",
                "semester": 8,
                "department": {
                    "_id": "67bb4144262d645baf554321",
                    "name": "Computer"
                }
            },
            {
                "_id": "67ece4e4fd7965f808ff5908",
                "name": "Multimedia Systems & Applications",
                "code": "CE823",
                "semester": 8,
                "department": {
                    "_id": "67bb4144262d645baf554321",
                    "name": "Computer"
                }
            }
        ]
    },
    // {
    //     "name": "TE COMP",
    //     "subjects": [
    //         {
    //             "_id": "67ece5dbfd7965f808ff590a",
    //             "name": "Artificial Intelligence",
    //             "code": "CE620",
    //             "semester": 6,
    //             "department": {
    //                 "_id": "67bb4144262d645baf554321",
    //                 "name": "Computer"
    //             }
    //         },
    //         {
    //             "_id": "67ece5dbfd7965f808ff5909",
    //             "name": "Modern Computer Networking",
    //             "code": "CE610",
    //             "semester": 6,
    //             "department": {
    //                 "_id": "67bb4144262d645baf554321",
    //                 "name": "Computer"
    //             }
    //         }
    //     ]
    // },
    // {
    //     "name": "SE COMP",
    //     "subjects": [
    //         {
    //             "_id": "67ecfbd89d1cf72aa8c9ffdf",
    //             "name": "Microprocessors &  Microcontrollers ",
    //             "department": {
    //                 "_id": "67bb4144262d645baf554321",
    //                 "name": "Computer"
    //             },
    //             "code": "CE420",
    //             "semester": 4,
    //             "createdAt": "2025-04-02T08:56:56.690Z",
    //             "updatedAt": "2025-04-02T08:56:56.690Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "67ecfbed9d1cf72aa8c9ffe9",
    //             "name": "Formal Languages &  Automata Theory ",
    //             "department": {
    //                 "_id": "67bb4144262d645baf554321",
    //                 "name": "Computer"
    //             },
    //             "code": "CE430",
    //             "semester": 4,
    //             "createdAt": "2025-04-02T08:57:17.401Z",
    //             "updatedAt": "2025-04-02T08:57:17.401Z",
    //             "__v": 0
    //         }
    //     ]
    // }
]);
  const [shuffleIsChecked, setShuffleIsChecked] = useState(false);

  // Toggle Popup Visibility
  const togglePopup = (e, type) => {
    e.preventDefault();
    if (type === "classroom") {
      document.getElementById("classroom-modal").showModal();
    } else if (type === "invigilator") {
      document.getElementById("invigilator-modal").showModal();
    }
  };
  // Handle Classroom Selection
  const handleSelect = (cr, type) => {
    if (type === "classroom") {
      setSelectedClassrooms((prev) => {
        // Toggle selection
        if (prev.some((selected) => selected._id === cr._id)) {
          return prev.filter((selected) => selected._id !== cr._id);
        } else {
          return [...prev, cr];
        }
      });
    } else if (type === "invigilator") {
      setSelectedInvigilators((prev) => {
        // Toggle selection
        if (prev.some((selected) => selected._id === cr._id)) {
          return prev.filter((selected) => selected._id !== cr._id);
        } else {
          return [...prev, cr];
        }
      });
    }
  };
  const totalCapacity = selectedClassrooms.reduce(
    (sum, cr) => sum + cr.rows * cr.columns * cr.benchCapacity,
    0
  );
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
  const safeGroupName = (name) => {
    setGroupName(name.trim());
    if (!name) {
      toast.error("Group name cannot be empty");
      return false;
    }

    if (Array.isArray(groups)) {
      for (let i = 0; i < groups.length; i++) {
        if (
          typeof groups[i] === "object" &&
          groups[i] !== null &&
          typeof groups[i].name === "string" &&
          groups[i].name === name
        ) {
          toast.error("Group name already used");
          return false;
        }
      }
    }
    return true;
  };
  // handle exam group creation
  const createGroup = (e) => {
    e.preventDefault();
    document.getElementById("create-exam-group-modal").showModal();
  };
  // handle subject group confirmation
  const confirmSubjectGroup = () => {
    if (!safeGroupName(groupName)) return;

    setGroups([...groups, { name: groupName, subjects: [] }]);
    setGroupName("");
    document.getElementById("create-exam-group-modal").close();
    // toast.success("Group created successfully");
    console.log(groups);
  };
  // handle Subject Group name Edit
  const handleSubjectGroupEdit = (e, index) => {
    e.preventDefault();
    setEditGroupName(groups[index].name);
    document.getElementById("edit-exam-group-modal").showModal();
    setSelectedGroupIndex(index);
  };
  const confirmSubjectGroupEdit = (e) => {
    // e.preventDefault();
    if (!safeGroupName(editGroupName)) return;
    setGroups((prevGroups) => {
      return prevGroups.map((group, index) =>
        index === selectedGroupIndex ? { ...group, name: editGroupName } : group
      );
    });

    setGroupName("");
  };
  // check if subject is already chosen
  const safeSubject = (subject) => {
    if (groups.some((group) => group.subjects.includes(subject))) return false;
    return true;
  };
  // handle add subject button
  const addSubjectModalHandle = (e, index) => {
    e.preventDefault();
    document.getElementById("subjects-display-modal").showModal();
    setSelectedGroupIndex(index);
  };
  const handleSelectSubject = (e, subject) => {
    e.preventDefault();
    if (!safeSubject(subject)) {
      toast.error("Subject already chosen");
      return;
    }
    setGroups((prevGroups) => {
      return prevGroups.map((group, index) =>
        index === selectedGroupIndex
          ? { ...group, subjects: [...group.subjects, subject] }
          : group
      );
    });
  };
  const handleGroupDelete = (e, index) => {
    e.preventDefault();
    setSelectedGroupIndex(index);
    document.getElementById("delete-exam-group-modal").showModal();
  };
  const confirmSubjectGroupDelete = (e) => {
    // e.preventDefault();
    setGroups((prevGroups) =>
      prevGroups.filter((group, index) => index !== selectedGroupIndex)
    );
    setSelectedGroupIndex(null);
  };
  const steps = [
    "Exam Info and Subjects",
    "Time Table Creation",
    "Classes and Invigilators",
    "Seat Arrangement",
    "Final View",
  ]; // Define steps

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if(currentStage===1){
        if(timetable.length>0){
            timetable.forEach(subject => {
                document.getElementById(`${subject.subjectId}-date`).value = subject.sub_date;
                document.getElementById(`${subject.subjectId}-starttime`).value = subject.sub_starttime;
                document.getElementById(`${subject.subjectId}-endtime`).value = subject.sub_endtime;
            });
        }
    }
  }, [currentStage]);

  const [timetable, setTimetable] = useState([]);

  const handleTimeTableSave = ()=>{
    const subjectIds = [];
    let updated_timetable = [];

    for (const subjectGroup of groups) {
        for (const subject of subjectGroup.subjects) {
            subjectIds.push(subject._id);
        }
    }
    console.log(subjectIds);
    
    for (let index = 0; index < subjectIds.length; index++) {
        const subjectId = subjectIds[index];
        const sub_date = document.getElementById(`${subjectId}-date`).value;
        const sub_starttime = document.getElementById(`${subjectId}-starttime`).value;
        const sub_endtime = document.getElementById(`${subjectId}-endtime`).value;
        if (!sub_date || !sub_starttime || !sub_endtime) {
          toast.error("Time Table Cannot be saved with empty entries");
          return;
        }
        updated_timetable.push({subjectId,sub_date,sub_starttime,sub_endtime});
        
    }
    setTimetable(updated_timetable);
    console.log(timetable);
    setTimeTableDisabled(true);
  }

  const action_page_control_buttons = (
    <div className="mb-4 flex justify-end gap-3">
      <button
        className="btn btn-primary"
        onClick={handlePrev}
        disabled={currentStage === 0}
      >
        <FaArrowLeft className="size-5" />
      </button>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={currentStage === steps.length - 1}
      >
        <FaArrowRight className="size-5" />
      </button>
    </div>
  );

  const handleChoiceClick = (choice) => {
    setSeatingArrangementSelectedChoice(choice);
  };
  const divStyle = {
    transform: "rotateX(51deg) rotateZ(43deg)",
    transformStyle: "preserve-3d",
    borderRadius: "16px",
    border: "3px solid black",
    boxShadow:
      "1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01), 28px 28px 28px 0 rgba(34, 33, 81, 0.25)",
    transition: "0.4s ease-in-out transform, 0.4s ease-in-out box-shadow",
  };

  const handleShuffleCheckboxChange = () => {
    setShuffleIsChecked(!shuffleIsChecked);
  };

  const transposeMatrix = (matrix) => {
    if (!matrix || matrix.length === 0) return [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = Array.from({ length: cols }, () =>
      Array(rows).fill(null)
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        transposed[j][i] = matrix[i][j];
      }
    }
    return transposed;
  };
  const colorMap = {};
  let colorIndex = 0;
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-lime-200",
  ];

  return (
    <>
      {isLoading === false ? (
        <div>
          <PageHeader heading="New Exam" action={action_page_control_buttons} />
          <div className="w-7/8 mx-auto">
            <form className="space-y-6">
              {/* 🚀 Stepper Progress Bar */}
              <FormInputBox>
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-full"
                    >
                      {/* 🚀 Line Between Steps */}
                      {index >= 0 && (
                        <div
                          className={`h-1 w-full transition-all duration-500 ${
                            index <= currentStage
                              ? "bg-green-400"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                      {/* 🚀 Bob (Step Circle) */}
                      <div className="translate-y-2 w-full flex flex-col">
                        <div
                          className={`w-10 h-10 flex items-center mx-auto justify-center rounded-full font-bold text-white transition-all duration-300 ${
                            index <= currentStage
                              ? "bg-green-400 scale-110"
                              : "bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {/* 🚀 Step Name */}
                        <p className="mt-2 text-sm font-semibold text-center">
                          {step}
                        </p>
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
                      <label
                        htmlFor="exam-name"
                        className="text-lg font-semibold"
                      >
                        Exam Name:
                      </label>
                      <input
                        type="text"
                        name="exam-name"
                        id="exam-name"
                        className="input input-bordered w-full"
                        placeholder="Enter exam name"
                      />
                    </div>
                  </FormInputBox>
                  {/* Subjects Input */}
                  <FormInputBox>
                    <label className="text-lg flex items-center justify-between font-semibold">
                      <h1>Subjects Input:</h1>
                      <button className="btn btn-primary" onClick={createGroup}>
                        {" "}
                        <Plus /> Create Group{" "}
                      </button>
                    </label>
                    {groups.length > 0 ? (
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
                            {groups.map((group, index) => (
                              <tr key={group.name}>
                                <td>{group.name}</td>
                                <td>
                                  {group.subjects.map((subject) => (
                                    <div key={subject._id}>
                                      {subject.code} - {subject.name}
                                    </div>
                                  ))}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary mr-3"
                                    onClick={(e) => addSubjectModalHandle(e, index)}
                                  >
                                    <PlusIcon className="size-4" /> Subject
                                  </button>
                                  <button
                                    className="btn btn-accent mr-3"
                                    onClick={(e) =>
                                      handleSubjectGroupEdit(e, index)
                                    }
                                  >
                                    <Pencil className="size-4" /> Edit Name
                                  </button>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={(e) => {
                                      handleGroupDelete(e, index);
                                    }}
                                  >
                                    <Trash className="size-4" /> Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <h1 className="text-sm text-gray-400">
                        No Groups Created
                      </h1>
                    )}
                  </FormInputBox>
                </section>
              )}
              {currentStage === 1 && (
                <FormInputBox>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Exam Timetable</h2>
                        <div>
                            { timeTableDisabled ?
                                <button type="button" onClick={()=>setTimeTableDisabled(false)} className="btn btn-primary">Edit</button>
                                :
                                <button type="button" onClick={handleTimeTableSave} className="btn btn-primary">Save</button>
                            }
                        </div>
                    </div>
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
                                    id={`${subject._id}-date`}
                                    disabled={timeTableDisabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    className="input input-bordered"
                                    id={`${subject._id}-starttime`}
                                    disabled={timeTableDisabled}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    className="input input-bordered"
                                    id={`${subject._id}-endtime`}
                                    disabled={timeTableDisabled}
                                  />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FormInputBox>
              )}
              {currentStage === 2 && (
                <section>
                  {/* Classroom Selection Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormInputBox>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xl font-bold">
                            Select Classrooms:
                          </label>
                          {/* Trigger Button */}
                          <button
                            onClick={(e) => togglePopup(e, "classroom")}
                            className="btn btn-primary"
                          >
                            <FaCube className="size-5" /> Classrooms
                          </button>
                        </div>
                        {/* Display Selected Classrooms & Capacity */}
                        <div className="p-3 bg-gray-100 rounded-lg border">
                          <p>
                            <strong>Total Capacity:</strong> {totalCapacity}
                          </p>
                          <p>
                            <strong>Selected:</strong>{" "}
                            {selectedClassrooms.length > 0
                              ? selectedClassrooms
                                  .map((cr) => cr.name)
                                  .join(", ")
                              : "None"}
                          </p>
                        </div>
                      </div>
                    </FormInputBox>
                    <FormInputBox>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xl font-bold">
                            Select Invigilators:
                          </label>
                          {/* Trigger Button */}
                          <button
                            onClick={(e) => togglePopup(e, "invigilator")}
                            className="btn btn-primary"
                          >
                            <FaCube className="size-5" /> Invigilators
                          </button>
                        </div>
                        {/* Display Selected Classrooms & Capacity */}
                        <div className="p-3 bg-gray-100 rounded-lg border">
                          <p>
                            <strong>Selected:</strong>{" "}
                            {selectedInvigilators.length > 0
                              ? selectedInvigilators
                                  .map((cr) => cr.name)
                                  .join(", ")
                              : "None"}
                          </p>
                        </div>
                      </div>
                    </FormInputBox>
                  </div>
                </section>
              )}
              {currentStage === 3 && (
                <section className="">
                  {/* arrangement input */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormInputBox>
                      <h1 className="text-2xl font-bold mb-4">
                        Arrangement Type
                      </h1>
                      <div>
                        <p className="mb-2"></p>
                        <div className="flex gap-5">
                          <div
                            type="button"
                            className={`p-4 relative text-xl font-semibold w-62 h-36 rounded-lg border active:scale-[99%] transition-transform ${
                              seatingArrangementSelectedChoice === "choice1" ? "bg-cyan-500" : ""
                            }`}
                            onClick={() => handleChoiceClick("choice1")}
                          >
                            <p className="font-bold">Level 1</p>
                            <div
                              className="grid grid-cols-4 w-fit gap-1 absolute right-8 bottom-2 p-3 bg-white"
                              style={divStyle}
                            >
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                            </div>
                          </div>
                          <div
                            type="button"
                            className={`p-4 relative text-xl font-semibold w-62 h-36 rounded-lg border active:scale-[99%] transition-transform ${
                              seatingArrangementSelectedChoice === "choice2" ? "bg-cyan-500" : ""
                            }`}
                            onClick={() => handleChoiceClick("choice2")}
                          >
                            <p className="font-bold">Level 2</p>
                            <div
                              className="grid grid-cols-4 w-fit gap-1 absolute right-8 bottom-2 p-3 bg-white"
                              style={divStyle}
                            >
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-indigo-600" />
                              <div className="size-4 rounded bg-yellow-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-green-600" />
                              <div className="size-4 rounded bg-red-600" />
                              <div className="size-4 rounded bg-green-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormInputBox>
                    <FormInputBox>
                      <div>
                        <h1 className="text-2xl font-bold mb-4">
                          Shuffle Student Each Day:
                        </h1>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              checked={shuffleIsChecked}
                              onChange={handleShuffleCheckboxChange}
                              className="hidden" // Add some margin to the right
                            />
                            <div
                              className={`flex justify-center items-center w-32 h-20 rounded-lg border-2 active:scale-[99%] border-neutral-400 ${
                                shuffleIsChecked ? "bg-cyan-500" : ""
                              }`}
                            >
                              <div className="mx-auto flex items-center">
                                <FaShuffle className="mr-3 size-10" />
                                <p className="text-xl font-bold">
                                  {shuffleIsChecked ? "Yes" : "No"}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </FormInputBox>
                  </div>
                  <div className="flex w-full justify-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) =>
                        {
                          e.preventDefault();
                          seatingArrangementBackendCall(
                            timetable,
                            selectedClassrooms,
                            seatingArrangementSelectedChoice
                          );
                        }
                      }
                    >
                      <BiGridVertical className="size-8" />
                      Preview Seating Arrangement
                    </button>
                  </div>
                </section>
              )}
            </form>
          </div>
          {currentStage === steps.length - 1 && (
            <div className="flex">
              <button className="btn btn-primary mx-auto w-50 text-lg font-bold">
                Save
              </button>
            </div>
          )}
          {/* Modal Popup for Classrooms */}
          <dialog id="classroom-modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-xl mb-4">Select Classrooms</h3>
              {/* Classroom Buttons Grid (Scrollable) */}
              <div className="p-4 grid grid-cols-4 gap-3 max-h-[20rem] overflow-auto">
                {classrooms.map((cr) => (
                  <button
                    key={cr._id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(cr, "classroom");
                    }}
                    className={`btn h-fit py-4 ${
                      selectedClassrooms.some(
                        (selected) => selected._id === cr._id
                      )
                        ? "btn-success"
                        : "btn-outline"
                    }`}
                  >
                    <p className="text-2xl truncate w-full">{cr.name}</p>
                    <p className="text-md">
                      Capacity: {cr.rows * cr.columns * cr.benchCapacity}
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
          <dialog id="invigilator-modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-xl mb-4">Select Invigilators</h3>
              {/* Classroom Buttons Grid (Scrollable) */}
              <div className="p-4 grid grid-cols-4 gap-3 max-h-[20rem] overflow-auto">
                {invigilators.map((invigilator) => (
                  <button
                    key={invigilator._id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(invigilator, "invigilator");
                    }}
                    className={`btn h-fit py-4 ${
                      selectedInvigilators.some(
                        (selected) => selected._id === invigilator._id
                      )
                        ? "btn-success"
                        : "btn-outline"
                    }`}
                  >
                    <p className="text-2xl truncate w-full">
                      {invigilator.name}
                    </p>
                    <p className="text-md">
                      Department: {invigilator.department.name}
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
              <h3 className="font-bold text-xl mb-4">Select Subject</h3>
              {/* Classroom Buttons Grid (Scrollable) */}
              <div className="p-4 grid grid-cols-2 gap-3 max-h-[20rem] overflow-auto">
                {subjects.map((subject) => (
                  <button
                    key={subject._id}
                    onClick={(e) => handleSelectSubject(e, subject)}
                    className="btn h-fit py-4"
                  >
                    <p className="text-2xl truncate w-full">{subject.name}</p>
                    <p className="text-md">Code: {subject.code}</p>
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
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="seating-arrangement-preview-modal" className="modal">
            <div className="modal-box w-11/12 max-w-6xl">
              <h3 className="font-bold text-xl mb-4">Select Classrooms</h3>
              {/* Classroom Buttons Grid (Scrollable) */}
              <div className="p-4  max-h-[20rem] overflow-y-auto">
                {!seatingArrangementData||seatingArrangementData.length===0?"not avail":
                  <div className="p-4 grid max-h-[30rem] overflow-auto">
                  {Object.entries(seatingArrangementData).map(([slotName, classRooms]) => (
                    <div key={slotName} className="m-5 p-2 border-2  border-black">
                      <h2>{slotName}</h2>
                      <div className="flex gap-5 flex-wrap">
                        {classRooms.map((classRoom) => {
                          const transposedArrangement = transposeMatrix(classRoom.arrangement || []);
            
                          return (
                            <div key={classRoom.name}>
                              <h3>{classRoom.name}</h3>
                              <table className="border-collapse w-full">
                                <thead>
                                  <tr>
                                    <th className="border p-2 text-center">Row/Col</th>
                                    {transposedArrangement[0]?.map((_, index) => (
                                      <th key={index} className="border p-2 text-center">
                                        {index + 1}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {transposedArrangement.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      <td className="border p-2 text-center">{rowIndex + 1}</td>
                                      {row.map((cell, colIndex) => {
                                        let cellColor = "";
                                        if (cell !== null) {
                                          if (!colorMap[cell]) {
                                            colorMap[cell] = colors[colorIndex % colors.length];
                                            colorIndex++;
                                          }
                                          cellColor = colorMap[cell];
                                        }
            
                                        return (
                                          <td
                                            key={colIndex}
                                            className={`border p-2 text-center ${cellColor}`}
                                          >
                                            {cell !== null ? cell : "-"}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                }
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
                Are you sure you want to delete "
                {selectedGroupIndex !== null && groups[selectedGroupIndex].name}
                " subject group?
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
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}
    </>
  );
};

export default NewExam;
