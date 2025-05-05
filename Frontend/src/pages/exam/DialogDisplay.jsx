import React from 'react'

const DialogDisplay = ({id}) => {
  return (
    <dialog id={`${id}`} className="modal">
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
  )
}

export default DialogDisplay