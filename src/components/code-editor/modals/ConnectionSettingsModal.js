import React, { useRef } from "react";
import { Modal } from "@mui/material";

function RenameModal(props) {
  const modalInputRef = useRef(null);

  return (
    <Modal open={props.modalOpen} onClose={props.handleClose}>
      <div
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white text-black border-2 border-solid border-white shadow-md p-4"
        }
      >
        <div className="text-2xl font-normal leading-normal mt-0 mb-2">
          Connection Settings
        </div>
        <div className="text-md font-normal leading-normal mt-0 mb-2">
          IP Address:
        </div>
        <div className="border-black border">
          <input
            autoFocus
            className="bg-white p-3 w-full"
            placeholder={props.currentConnection}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                props.updateConnection(event.target.value);
                event.currentTarget.blur();
                props.handleClose();
              }
            }}
            ref={modalInputRef}
          />
        </div>
        <div className="flex mt-2">
          <button
            className="bg-blue-500 p-1 mr-1 text-lg text-white font-semibold"
            onClick={(event) => {
              event.stopPropagation();
              if (modalInputRef.current.value) {
                props.updateConnection(modalInputRef.current.value);
              }
              props.handleClose();
            }}
          >
            Connect
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
    </Modal>
  );
}

export default RenameModal;
