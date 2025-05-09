import React, { useState } from 'react'
import FormInputBox from '../../components/FormInputBox';
import { FaShuffle } from 'react-icons/fa6';
import { BiGridVertical } from "react-icons/bi";
const Page4 = ({
  currentStage,
  seatingArrangementBackendCall,
  seatingArrangementData,
  selectedClassrooms,
  selectedInvigilators,
  seatingArrangementSelectedChoice,
  setSeatingArrangementSelectedChoice,
}) => {
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
  const [shuffleIsChecked, setShuffleIsChecked] = useState(false);
  const [seatingArrangementDisplay, setSeatingArrangementDisplay] = useState(false);
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
  return (
    <>
      <section className={currentStage === 3 ? "" : "hidden"}>
        {/* arrangement input */}
        {!seatingArrangementDisplay ? (
          <div className="grid grid-cols-2 gap-4">
            <FormInputBox>
              <h1 className="text-2xl font-bold mb-4">Arrangement Type</h1>
              <div>
                <p className="mb-2"></p>
                <div className="flex gap-5">
                  <div
                    type="button"
                    className={`p-4 relative text-xl font-semibold w-62 h-36 rounded-lg border active:scale-[99%] transition-transform ${
                      seatingArrangementSelectedChoice === "choice1"
                        ? "bg-cyan-500"
                        : ""
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
                      seatingArrangementSelectedChoice === "choice2"
                        ? "bg-cyan-500"
                        : ""
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
        ) : (
          <FormInputBox>
            {!seatingArrangementData || seatingArrangementData.length === 0 ? (
              "not avail"
            ) : (
              // <div className="p-4 max-h-[20rem] bg-blue-500 overflow-y-auto">
              <div className="p-4 grid  max-h-[30rem] overflow-auto">
                {Object.entries(seatingArrangementData).map(
                  ([slotName, classRooms]) => (
                    <div
                      key={slotName}
                      className="m-5 p-2 border-2  border-black"
                    >
                      <h2>{slotName}</h2>
                      <div className="flex gap-5 flex-wrap">
                        {classRooms.map((classRoom) => {
                          const transposedArrangement = transposeMatrix(
                            classRoom.arrangement || []
                          );
                          return (
                            <div key={classRoom.name}>
                              <h3>{classRoom.name}</h3>
                              <table className="border-collapse w-full">
                                <thead>
                                  <tr>
                                    <th className="border p-2 text-center">
                                      Row/Col
                                    </th>
                                    {transposedArrangement[0]?.map(
                                      (_, index) => (
                                        <th
                                          key={index}
                                          className="border p-2 text-center"
                                        >
                                          {index + 1}
                                        </th>
                                      )
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {transposedArrangement.map(
                                    (row, rowIndex) => (
                                      <tr key={rowIndex}>
                                        <td className="border p-2 text-center">
                                          {rowIndex + 1}
                                        </td>
                                        {row.map((cell, colIndex) => {
                                          let cellColor = "";
                                          if (cell !== null) {
                                            if (!colorMap[cell]) {
                                              colorMap[cell] =
                                                colors[
                                                  colorIndex % colors.length
                                                ];
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
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
              // </div>
            )}
          </FormInputBox>
        )}
        <div className="flex w-full justify-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(selectedClassrooms);
              if (!timeTableDisabled) {
                toast.error(
                  "Please save the timetable before trying to generate seating arrangement."
                );
                return;
              }
              if (selectedClassrooms.length === 0) {
                toast.error(
                  "No classroom has been selected, please select atleast one"
                );
                return;
              }
              seatingArrangementBackendCall(
                timetable,
                selectedClassrooms,
                seatingArrangementSelectedChoice
              );
            }}
          >
            <BiGridVertical className="size-8" />
            Preview Seating Arrangement
          </button>
        </div>
      </section>
      <section>
        {/* <dialog id="seating-arrangement-preview-modal" className="modal">
          <div className="modal-box w-11/12 max-w-6xl">
            <h3 className="font-bold text-xl mb-4">Seating Arrangement</h3>
            <div className="p-4  max-h-[20rem] overflow-y-auto">
              {!seatingArrangementData ||
              seatingArrangementData.length === 0 ? (
                "not avail"
              ) : (
                <div className="p-4 grid max-h-[30rem] overflow-auto">
                  {Object.entries(seatingArrangementData).map(
                    ([slotName, classRooms]) => (
                      <div
                        key={slotName}
                        className="m-5 p-2 border-2  border-black"
                      >
                        <h2>{slotName}</h2>
                        <div className="flex gap-5 flex-wrap">
                          {classRooms.map((classRoom) => {
                            const transposedArrangement = transposeMatrix(
                              classRoom.arrangement || []
                            );
                            return (
                              <div key={classRoom.name}>
                                <h3>{classRoom.name}</h3>
                                <table className="border-collapse w-full">
                                  <thead>
                                    <tr>
                                      <th className="border p-2 text-center">
                                        Row/Col
                                      </th>
                                      {transposedArrangement[0]?.map(
                                        (_, index) => (
                                          <th
                                            key={index}
                                            className="border p-2 text-center"
                                          >
                                            {index + 1}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {transposedArrangement.map(
                                      (row, rowIndex) => (
                                        <tr key={rowIndex}>
                                          <td className="border p-2 text-center">
                                            {rowIndex + 1}
                                          </td>
                                          {row.map((cell, colIndex) => {
                                            let cellColor = "";
                                            if (cell !== null) {
                                              if (!colorMap[cell]) {
                                                colorMap[cell] =
                                                  colors[
                                                    colorIndex % colors.length
                                                  ];
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
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="modal-action">
              <form method="dialog" className="w-full flex">
                <button className="btn btn-primary mx-auto px-8 font-bold text-lg">
                  Done
                </button>
              </form>
            </div>
          </div>
        </dialog> */}
      </section>
    </>
  );
};

export default Page4