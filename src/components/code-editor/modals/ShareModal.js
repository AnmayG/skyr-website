import React, { useRef } from "react";

function ShareModal(props) {
  const shareModalInputRef = useRef(null);

  return (
    <div
      className={
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white text-black border-2 border-solid border-white shadow-md p-4"
      }
    >
      <div className="text-2xl font-normal leading-normal mt-0 mb-2">
        Share Project
      </div>
      <div className="border-black border">
        <input
          autoFocus
          className="bg-white p-3 w-full"
          placeholder={"someone@example.com"}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.handleClose();
            }
          }}
          ref={shareModalInputRef}
        />
      </div>
      <div className="flex mt-2">
        <button
          className="bg-blue-500 p-1 mr-1 text-lg text-white font-semibold"
          onClick={(event) => {
            event.stopPropagation();
            props.handleClose();
          }}
        >
          Share
        </button>
        <button
          className="border-black border p-1 text-lg"
          onClick={() => {
            props.handleClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ShareModal;
