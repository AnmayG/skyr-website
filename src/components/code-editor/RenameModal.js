import React from "react";

function RenameModal(props) {
  return (
    <div>
      <div>Rename:</div>
      <input
        defaultValue={props.name}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            update(documentRefListRef.current[i], {
              name: event.target.value,
            });
            event.currentTarget.blur();
          }
        }}
      />
      <div
        onClick={() => {
          props.toggle();
        }}
      >
        Close
      </div>
    </div>
  );
}

export default RenameModal;
