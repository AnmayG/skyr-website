import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import KebabMenu from "../general/KebabMenu";
import {
  updateFirestoreItemName,
  deleteFirestoreItem,
} from "../../interfaces/FirestoreInterface";
import { auth } from "../../firebase";
import { deleteDatabaseDocument } from "../../interfaces/RealtimeDBInterface";

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function ProjectCard(props) {
  const navigate = useNavigate();
  const [inputRef, setInputFocus] = UseFocus();
  // props includes fileName, createdDate, and creator uid

  const options = ["Rename", "Delete"];

  const optionFunctions = [
    () => {
      setInputFocus();
    },
    () => {
      // TODO: Decide if making all of these references was a good idea
      // TODO: Add an alert during sharing stating that the project itself will not be deleted if its shared
      deleteFirestoreItem("/projects", props.fileId);
      deleteFirestoreItem(
        `/users/${auth.currentUser.uid}/projects`,
        props.fileId
      );
      deleteDatabaseDocument(`/projects/${props.fileId}`);
      navigate("/dashboard")
    },
  ];

  return (
    <div className="flex w-full border border-black bg-white items-center">
      <div
        className="flex justify-between w-full py-3"
        onClick={(event) => {
          navigate(`/editor/?projid=${props.fileId}`);
        }}
      >
        <div className="flex justify-start items-center">
          {/* <div className="ml-10">{props.fileName}</div> */}
          <input
            className="ml-10"
            defaultValue={props.fileName}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateFirestoreItemName(
                  auth.currentUser.uid,
                  props.fileId,
                  event.target.value
                );
              }
            }}
            ref={inputRef}
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
