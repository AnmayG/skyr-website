import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
  const navigate = useNavigate()
  // props includes fileName, createdDate, and creator uid
  return (
    <div className="flex justify-between w-full py-3 bg-white"
      onClick={() => {
        navigate(`/editor/?id=${props.fileId}`)
      }}
    >
      <div className="flex justify-start items-center">
        <div className="ml-10">{props.fileName}</div>
      </div>
      <div className="flex justify-end items-center">
        <div className="mr-10">{props.createdDate}</div>
        {/* <Avatar className="mr-10" src={props.creator.imageUrl} /> */}
      </div>
    </div>
  );
}

export default ProjectCard;
