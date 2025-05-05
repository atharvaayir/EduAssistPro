import React from "react";

const DislogInput = ({
  id,
  title,
  inputValue,
  setInputValue,
  button1Text,
  button1Function,
  button2Text,
}) => {
  return (
    <dialog id={`${id}`} className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <input
          type="text"
          className="input input-bordered w-full mt-6"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter exam group name"
        />
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-primary font-bold mr-5"
              onClick={(e) => {
                e.preventDefault();
                button1Function();
              }}
            >
              {button1Text}
            </button>
            <button className="btn bg-red-400 hover:bg-red-500 font-bold">
              {button2Text ?? 'Cancel'}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DislogInput;
