import React from "react";
import FormInputBox from "../../components/FormInputBox";
import { FaCube } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import DialogBig from "./DialogBig";

const Page3Dailogs = ({
  classrooms,
  invigilators,
  selectedClassrooms,
  selectedInvigilators,
  setSelectedClassrooms,
  setSelectedInvigilators,
}) => {
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
      <DialogBig 
        id="classroom-modal"
        title="Select Classrooms"
        content={()=>(
          <>
          {classrooms.map((classroom) => (
            <button
              type="button"
              key={classroom._id}
              onClick={(e) => {
                e.preventDefault();
                handleSelect(classroom, 'classroom');
              }}
              className={`btn h-fit py-4 ${
                selectedClassrooms ? 
                  selectedClassrooms.some((selected) => selected._id === classroom._id)
                    ? "btn-success"
                    : "btn-outline"
                  : ""
              }`}
            >
              <p className="text-2xl truncate w-full">{classroom.name}</p>
              <p className="text-md">
                Capacity: {classroom.rows * classroom.columns * classroom.benchCapacity}
              </p>
            </button>
          ))}
          </>
        )}
        buttons={()=>(
          <>
            <button
              onClick={e=>{
                e.preventDefault();
                document.getElementById('classroom-modal').close();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Done
            </button>
          </>
        )}
        buttonDirection='center'
      />
      <DialogBig 
        id="invigilator-modal"
        title="Select Invigilators"
        content={()=>(
          <>
          {invigilators.map((invigilator) => (
            <button
              type="button"
              key={invigilator._id}
              onClick={(e) => {
                e.preventDefault();
                handleSelect(invigilator, 'invigilator');
              }}
              className={`btn h-fit py-4 ${
                selectedInvigilators ? 
                  selectedInvigilators.some((selected) => selected._id === invigilator._id)
                    ? "btn-success"
                    : "btn-outline"
                  : ""
              }`}
            >
              <p className="text-2xl truncate w-full">{invigilator.name}</p>
              <p className="text-md">Department: {invigilator.department.name}</p>
            </button>
          ))}
          </>
        )}
        buttons={()=>(
          <>
            <button
              onClick={e=>{
                e.preventDefault();
                document.getElementById('invigilator-modal').close();
              }} 
              className="btn btn-primary px-8 font-bold text-lg">
              Done
            </button>
          </>
        )}
        buttonDirection='center'
      />
    </>
  );
};

const Page3 = ({
  currentStage,
  selectedClassrooms,
  selectedInvigilators,
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
                  <IoPeople className="size-5" /> Invigilators
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
    </>
  );
};

export {Page3,Page3Dailogs};
