import React from 'react'

const DialogBig = ({
  id,
  title,
  content,
  buttons,
  buttonDirection,
}) => {
  const buttomDirectionClassName = {'left':'justify-start','right':'justify-end','center':'justify-center'}[buttonDirection]
  return (
    <>
      <dialog id={`${id}`} className="modal">
      <div className="modal-box w-11/12 max-w-6xl">
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        {/* Classroom Buttons Grid (Scrollable) */}
        <div className="p-4 grid grid-cols-4 gap-3 max-h-[20rem] overflow-auto">
          {/* Content */}
          {
            !content ? "no content specified" :
            content()
          }
        </div>
        {/* Modal Close Button */}
        <div className="modal-action">
          <form method='dialog' className={`w-full flex ${buttomDirectionClassName}`}>
          {
            !buttons ? "no buttons specified" :
            buttons()
          }
          </form>
        </div>
      </div>
    </dialog>
    </>
  )
}

export default DialogBig