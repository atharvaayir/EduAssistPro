import React, { useState } from "react";
import FormInputBox from "../../components/FormInputBox";
import { Pencil, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import DialogBig from "./DialogBig";
import DialogSmall from "./DialogSmall";

const Page1dialogs = ({
  selectedGroupIndex,
  setSelectedGroupIndex,
  editGroupName,
  setEditGroupName,
  groups, 
  setGroups,
  subjects
})=>{
  const [groupName, setGroupName] = useState("");

  // check if subject is already chosen
  const safeSubject = (subject) => {
    const inputSubjectId = subject._id;
    console.log(groups);
    console.log(subject);
    if (groups.some((group) => group.subjects.some(subject => subject._id === inputSubjectId))) {
      console.log('bruh');
      
      return false;
    }
    return true;
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
  // handle subject group confirmation
  const confirmSubjectGroup = () => {
    if (!safeGroupName(groupName)) return;

    setGroups([...groups, { name: groupName, subjects: [] }]);
    setGroupName("");
    document.getElementById("create-exam-group-modal").close();
    // toast.success("Group created successfully");
    console.log(groups);
  };
  const confirmSubjectGroupEdit = () => {
    if (!safeGroupName(editGroupName)) return;
    setGroups((prevGroups) => {
      return prevGroups.map((group, index) =>
        index === selectedGroupIndex ? { ...group, name: editGroupName } : group
      );
    });
    setGroupName("");
    document.getElementById("edit-exam-group-modal").close();
  };
  const handleSelectSubject = (subject) => {
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
  const confirmSubjectGroupDelete = (e) => {
    // e.preventDefault();
    setGroups((prevGroups) =>
      prevGroups.filter((group, index) => index !== selectedGroupIndex)
    );
    setSelectedGroupIndex(null);
    document.getElementById("delete-exam-group-modal").close();
  };
  return (
    <>
      <DialogBig
        id="subjects-display-modal"
        title="Select Subject"
        content={() => (
          <>
            {subjects.map((subject) => (
              <button
                type="button"
                key={subject._id}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectSubject(subject);
                }}
                className={`btn h-fit py-4`}
              >
                <p className="text-2xl truncate w-full">{subject.name}</p>
                <p className="text-md">Code: {subject.code}</p>
              </button>
            ))}
          </>
        )}
        buttons={() => (
          <>
            <button
              onClick={e=>{
                e.preventDefault();
                document.getElementById('subjects-display-modal').close();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Done
            </button>
          </>
        )}
        buttonDirection='center'
      />
      <DialogSmall
        id='create-exam-group-modal'
        title="Create New Subject Group"
        content={()=>(
            <input
            type="text"
            className="input input-bordered w-full mt-6"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter exam group name"
          />
        )}
        buttons={() => (
          <div className="flex gap-3">
            <button
              onClick={e=>{
                e.preventDefault();
                confirmSubjectGroup();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Create
            </button>

            <button className="btn text-white font-semibold text-lg bg-red-500/90 hover:bg-red-500">
              Cancel
            </button>
          </div>
        )}
        buttonDirection='right'
      />
      <DialogSmall
        id='edit-exam-group-modal'
        title="Edit Subject Group"
        content={()=>(
            <input
            type="text"
            className="input input-bordered w-full mt-6"
            value={editGroupName}
            onChange={(e) => setEditGroupName(e.target.value)}
            placeholder="Enter exam group name"
          />
        )}
        buttons={() => (
          <div className="flex gap-3">
            <button
              onClick={e=>{
                e.preventDefault();
                confirmSubjectGroupEdit();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Update
            </button>

            <button className="btn text-white font-semibold text-lg bg-red-500/90 hover:bg-red-500">
              Cancel
            </button>
          </div>
        )}
        buttonDirection='right'
      />
      <DialogSmall
        id='delete-exam-group-modal'
        title="Delete Subject Group"
        content={()=>(
          <p className="mt-5">
            Are you sure you want to delete "
            {selectedGroupIndex !== null && groups[selectedGroupIndex].name}"
            subject group?
          </p>
        )}
        buttons={() => (
          <div className="flex gap-3">
            <button
              onClick={e=>{
                e.preventDefault();
                confirmSubjectGroupDelete();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Delete
            </button>
          </div>
        )}
        buttonDirection='right'
        crossButtonDisplay='true'
      />
    </>
  );
};

const Page1 = ({
  currentStage,
  examName,
  setExamName,
  groups,
  setSelectedGroupIndex,
  setEditGroupName,
}) => {
  

  // handle exam group creation
  const createGroup = (e) => {
    e.preventDefault();
    document.getElementById("create-exam-group-modal").showModal();
  };

  // handle Subject Group name Edit
  const handleSubjectGroupEdit = (e, index) => {
    e.preventDefault();
    setEditGroupName(groups[index].name);
    document.getElementById("edit-exam-group-modal").showModal();
    setSelectedGroupIndex(index);
  };

  // handle add subject button
  const addSubjectModalHandle = (e, index) => {
    e.preventDefault();
    document.getElementById("subjects-display-modal").showModal();
    setSelectedGroupIndex(index);
  };

  const handleGroupDelete = (e, index) => {
    e.preventDefault();
    setSelectedGroupIndex(index);
    document.getElementById("delete-exam-group-modal").showModal();
  };


  

  return (
    <section className={currentStage === 0 ? "" : "hidden"}>
      <FormInputBox>
        <div className="flex flex-col gap-2">
          <label htmlFor="exam-name" className="text-lg font-semibold">
            Exam Name:
          </label>
          <input
            type="text"
            name="exam-name"
            id="exam-name"
            className="input input-bordered w-full"
            placeholder="Enter exam name"
            value={examName || ""}
            onChange={(e) => setExamName(e.target.value)}
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
                        className="btn btn-primary mr-3 rounded-xl"
                        onClick={(e) => addSubjectModalHandle(e, index)}
                      >
                        <FaPlus  className="size-4" /> Subject
                      </button>
                      <button
                        className="btn btn-accent mr-3 rounded-xl"
                        onClick={(e) => handleSubjectGroupEdit(e, index)}
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        className="btn bg-red-500/80 hover:bg-red-500 rounded-xl"
                        onClick={(e) => {
                          handleGroupDelete(e, index);
                        }}
                      >
                        <Trash className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-sm text-gray-400">No Groups Created</h1>
        )}
      </FormInputBox>
    </section>
  );
};

export { Page1, Page1dialogs };
