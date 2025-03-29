import React, { useEffect, useState } from 'react'
import PageHeader from "../../components/PageHeader";
import { useExamStore } from '../../store/useExamStore';

const NewExam = () => {
    const { getClassrooms, classrooms, setStage, currentStage } =
        useExamStore();

    const action = <button className="btn btn-primary">Save</button>;

    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    const totalCapacity = selectedClassrooms.reduce(
        (sum, cr) => sum + cr.rows * cr.columns * cr.benchCapacity,
        0
    );
    // Handle Next Step
    const handleNext = () => {
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

    const steps = ["Step 1", "Step 2", "Step 3", "Step 4"]; // Define steps

    useEffect(() => {
        getClassrooms();
    }, []);

    return (
        <>
            <PageHeader heading="New Exam" action={action} />
            <form className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
            {/* 🚀 Stepper Progress Bar */}
            <div className="relative flex items-center justify-between mb-6">
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
                        
                        <div className='translate-y-2 '>
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white transition-all duration-300 ${
                                    index <= currentStage ? "bg-primary scale-110" : "bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </div>
                            {/* 🚀 Step Name */}
                            <p className="mt-2 text-sm font-semibold">{step}</p>
                        </div>
                    </div>
                ))}
            </div>
                {/* Page 1 */}
                {currentStage === 0 && (
                    <section>
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
                                className="input input-bordered bg-gray-300 w-full"
                            />
                        </div>
                        {/* Classroom Selection Section */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">
                                Select Classrooms:
                            </label>
                            {/* Trigger Button */}
                            <button
                                onClick={togglePopup}
                                className="btn btn-primary w-full"
                            >
                                Select Classrooms
                            </button>
                            {/* Display Selected Classrooms & Capacity */}
                            <div className="p-3 bg-gray-100 rounded-lg border">
                                <p>
                                    <strong>Selected:</strong>{" "}
                                    {selectedClassrooms.length > 0
                                        ? selectedClassrooms
                                              .map((cr) => cr.name)
                                              .join(", ")
                                        : "None"}
                                </p>
                                <p>
                                    <strong>Total Capacity:</strong>{" "}
                                    {totalCapacity}
                                </p>
                            </div>
                        </div>
                        {/* Subjects Input */}
                        <div>
                            <label className="text-lg font-semibold">
                                Subjects Input:
                            </label>
                        </div>
                    </section>
                )}
                {currentStage === 1 && <section>stage 2</section>}
                {currentStage === 2 && <section>stage 3</section>}
                {currentStage === 3 && <section>stage 4</section>}
            </form>
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
            <div className="mt-4 flex justify-between">
                <button
                    className="btn btn-outline"
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
        </>
    );
};

export default NewExam;