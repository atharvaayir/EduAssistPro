import React from "react";
import FormInputBox from "../../components/FormInputBox";
import { FaCube } from "react-icons/fa";

const Page3 = ({
  currentStage,
  classrooms,
  invigilators,
  selectedClassrooms,
  setSelectedClassrooms,
  selectedInvigilators,
  setSelectedInvigilators,
}) => {
  const totalCapacity = selectedClassrooms.reduce(
    (sum, cr) => sum + cr.rows * cr.columns * cr.benchCapacity,
    0
  );
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
  return (
    <>
      {/* main content of page 3 */}
      <section className={currentStage === 2 ? "" : "hidden"}>
        {/* Classroom Selection Section */}
        <div className="grid grid-cols-2 gap-4">
          <FormInputBox>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xl font-bold">Select Classrooms:</label>
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
                    ? selectedClassrooms.map((cr) => cr.name).join(", ")
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
                    ? selectedInvigilators.map((cr) => cr.name).join(", ")
                    : "None"}
                </p>
              </div>
            </div>
          </FormInputBox>
        </div>
      </section>
      {/* dialoges of page 3 */}
      <section>
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
                  <p className="text-2xl truncate w-full">{invigilator.name}</p>
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
      </section>
    </>
  );
};

export default Page3;
