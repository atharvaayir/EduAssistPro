import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useExamStore } from "../../store/useExamStore";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Page1, Page1dialogs } from "./page1";
import Page2 from "./Page2";
import {Page3,Page3Dailogs} from "./Page3";
import PageNumberDisplay from "./PageNumberDisplay";
import Page4 from "./Page4";
import DialogBig from "./DialogBig";

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
  const [timeTableDisabled, setTimeTableDisabled] = useState(false);
  const [seatingArrangementSelectedChoice, setSeatingArrangementSelectedChoice] = useState("choice1");
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
            // {
            //     "_id": "67ece4e4fd7965f808ff5908",
            //     "name": "Multimedia Systems & Applications",
            //     "code": "CE823",
            //     "semester": 8,
            //     "department": {
            //         "_id": "67bb4144262d645baf554321",
            //         "name": "Computer"
            //     }
            // }
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

  const [examName,setExamName] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [editGroupName, setEditGroupName] = useState("");

  // Handle Next Step
  const handleNext = () => {
    if (currentStage < steps.length - 1) {
      setStage(1,true);
    }
  };
  // Handle Previous Step
  const handlePrev = () => {
    if (currentStage > 0) {
      setStage(-1,true);
    }
  };
  
  const steps = [
    "Exam Info and Subjects",
    "Time Table Creation",
    "Classes and Invigilators",
    "Seat Arrangement",
    // "People",
    "Final View",
  ]; // Define steps

  useEffect(() => {
    setStage(0,false);
    getAllData();
  }, []);

  // useEffect(() => {
  //   if(currentStage===1){
  //       if(timetable.length>0){
  //           timetable.forEach(subject => {
  //               document.getElementById(`${subject.subjectId}-date`).value = subject.sub_date;
  //               document.getElementById(`${subject.subjectId}-starttime`).value = subject.sub_starttime;
  //               document.getElementById(`${subject.subjectId}-endtime`).value = subject.sub_endtime;
  //           });
  //       }
  //   }
  // }, [currentStage]);


  const action_page_control_buttons = (
    <div className="mb-4 flex justify-end gap-3">
      <button
        className="btn btn-primary shadow shadow-black/20"
        onClick={handlePrev}
        disabled={currentStage === 0}
      >
        <FaArrowLeft className="size-5" />
      </button>
      <button
        className="btn btn-primary shadow shadow-black/20"
        onClick={handleNext}
        disabled={currentStage === steps.length - 1}
      >
        <FaArrowRight className="size-5" />
      </button>
    </div>
  );

  return (
    <>
      {isLoading === false ? (
        <div>
          <PageHeader heading="New Exam" action={action_page_control_buttons} />
          <div className="w-7/8 mx-auto">
            <form className="space-y-6">
              {/* 🚀 Stepper Progress Bar */}
              <PageNumberDisplay currentStage={currentStage} steps={steps} />
              <Page1
                currentStage={currentStage}
                examName={examName}
                setExamName={setExamName}
                groups={groups}
                setSelectedGroupIndex={setSelectedGroupIndex}
                setEditGroupName={setEditGroupName}
              />
              <Page2
                currentStage={currentStage}
                timetable={timetable}
                setTimetable={setTimetable}
                timeTableDisabled={timeTableDisabled}
                setTimeTableDisabled={setTimeTableDisabled}
                groups={groups}
              />
              <Page3
                currentStage={currentStage}
                selectedClassrooms={selectedClassrooms}
                selectedInvigilators={selectedInvigilators}
              />
              <Page4
                currentStage={currentStage}
                seatingArrangementBackendCall={seatingArrangementBackendCall}
                seatingArrangementData={seatingArrangementData}
                selectedClassrooms={selectedClassrooms}
                selectedInvigilators={selectedInvigilators}
                seatingArrangementSelectedChoice={
                  seatingArrangementSelectedChoice
                }
                setSeatingArrangementSelectedChoice={
                  setSeatingArrangementSelectedChoice
                }
              />
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
          <section>
            {Page1dialogs && (
              <Page1dialogs
                selectedGroupIndex={selectedGroupIndex}
                setSelectedGroupIndex={setSelectedGroupIndex}
                editGroupName={editGroupName}
                setEditGroupName={setEditGroupName}
                groups={groups}
                setGroups={setGroups}
                subjects={subjects}
              />
            )}
            {Page3Dailogs && (
              <Page3Dailogs
                classrooms={classrooms}
                invigilators={invigilators}
                selectedClassrooms={selectedClassrooms}
                selectedInvigilators={selectedInvigilators}
                setSelectedClassrooms={setSelectedClassrooms}
                setSelectedInvigilators={setSelectedInvigilators}
              />
            )}
          </section>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4  mt-16">
          <div className="skeleton h-36 w-11/12 mx-auto mb-2"></div>
          <div className="skeleton h-36 w-11/12 mx-auto mb-2"></div>
          <div className="skeleton h-36 w-11/12 mx-auto mb-2"></div>
        </div>
      )}
    </>
  );
};

export default NewExam;
