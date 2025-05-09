import React from 'react'
import { ImCross } from "react-icons/im";
const DialogSmall = ({
  id,
  title,
  content,
  buttons,
  buttonDirection,
  crossButtonDisplay=false
}) => {
  const buttomDirectionClassName = {'left':'justify-start','right':'justify-end','center':'justify-center'}[buttonDirection]
  return (
    <>
      <dialog id={`${id ?? ""}`} className="modal">
        <div className="modal-box w-1/2 max-w-5xl ">
          <h3 className="font-bold text-xl flex items-center justify-between">
            {title ?? "no title specified"}
            <button 
              className={`${crossButtonDisplay ? '':'hidden'}`}
              onClick={()=>document.getElementById(id).close()}
            >
              <ImCross className='hover:bg-gray-300 text-gray-600 p-2 rounded-lg size-7' />
            </button>
          </h3>
            {/* Content */}
            {!content ? "no content specified" : content()}
          {/* Modal Close Button */}
          <div className="modal-action">
            <form
              method="dialog"
              className={`w-full flex ${buttomDirectionClassName}`}
            >
              {!buttons ? "no buttons specified" : buttons()}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default DialogSmall