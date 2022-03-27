import React from "react";
import { useNavigate } from "react-router-dom";
import KebabMenu from "../general/KebabMenu";
import {
  updateFirestoreItemName,
  deleteFirestoreItem,
} from "../../interfaces/FirestoreInterface";
import { auth } from "../../firebase";

function ProjectCard(props) {
  const navigate = useNavigate();
  // props includes fileName, createdDate, and creator uid

  const options = ["Rename", "Delete"];

  const optionFunctions = [
    () => {
      console.log("clicked rename");
    },
    () => {
      deleteFirestoreItem(auth.currentUser.uid, props.fileId);
    },
  ];

  return (
    <div className="flex w-full bg-white items-center">
      <div
        className="flex justify-between w-full py-3"
        onClick={(event) => {
          navigate(`/editor/?id=${props.fileId}`);
        }}
      >
        <div className="flex justify-start items-center">
          {/* <div className="ml-10">{props.fileName}</div> */}
          <input
            className="ml-10 w-[50vw]"
            defaultValue={props.fileName}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("here");
                updateFirestoreItemName(
                  auth.currentUser.uid,
                  props.fileId,
                  event.target.value
                );
              }
            }}
          />
        </div>
        <div className="flex justify-end items-center">
          <div className="mr-10">{props.createdDate}</div>
          {/* <Avatar className="mr-10" src={props.creator.imageUrl} /> */}
        </div>
      </div>
      <KebabMenu options={options} optionFunctions={optionFunctions} />
    </div>
  );
}

export default ProjectCard;
