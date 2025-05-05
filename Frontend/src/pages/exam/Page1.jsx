import React, { useState } from "react";
import FormInputBox from "../../components/FormInputBox";
import { Pencil, Plus, PlusIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import DislogInput from "./DislogInput";

let Page1dialogs;

const Page1 = ({
  currentStage,
  examName,
  setExamName,
  groups,
  subjects,
  setGroups,
}) => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
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
  const confirmSubjectGroupEdit = () => {
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
    if (groups.some((group) => group.subjects.includes(subject))) {
      console.log("bruh");

      return false;
    }
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

  Page1dialogs = (
    <>
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
      <dialog id="delete-exam-group-modal" className="modal">
        <div className="modal-box w-1/2 max-w-5xl">
          <h3 className="font-bold text-lg">Delete Subject Group</h3>
          <p>
            Are you sure you want to delete "
            {selectedGroupIndex !== null && groups[selectedGroupIndex].name}"
            subject group?
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
      <DislogInput
        id="create-exam-group-modal"
        title="Create New Subject Group"
        inputValue={groupName}
        setInputValue={setGroupName}
        button1Text="Create"
        button1Function={confirmSubjectGroup}
      />
      <DislogInput
        id="edit-exam-group-modal"
        title="Edit Subject Group"
        inputValue={editGroupName}
        setInputValue={setEditGroupName}
        button1Text="Update"
        button1Function={confirmSubjectGroupEdit}
      />
    </>
  );

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
                        className="btn btn-primary mr-3"
                        onClick={(e) => addSubjectModalHandle(e, index)}
                      >
                        <PlusIcon className="size-4" /> Subject
                      </button>
                      <button
                        className="btn btn-accent mr-3"
                        onClick={(e) => handleSubjectGroupEdit(e, index)}
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
          <h1 className="text-sm text-gray-400">No Groups Created</h1>
        )}
      </FormInputBox>
    </section>
  );
};

export { Page1,Page1dialogs };
