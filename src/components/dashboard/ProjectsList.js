import { Add } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
  const [docDataList, setDocDataList] = useState([]);
  const docDataListRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    var cleanedUpDbListener = false;
    // Sets up a firestore listener for the documents
    if (!cleanedUpDbListener) {
      db.collection(`/users/${auth.currentUser.uid}/documents/`)
        .orderBy("name")
        .onSnapshot((list) => {
          var tempList = [];
          for (const doc of list.docs) {
            tempList.push({ id: doc.id, value: doc.data() });
          }
          setDocDataList(tempList);
          docDataListRef.current = tempList;
        });
    }

    return () => {
      cleanedUpDbListener = true;
    };
  }, []);

  return (
    <div className="mx-20 overflow-y-auto">
      {docDataList.length > 0 ? (
        docDataList.map((item, i) => {
          return (
            <ProjectCard
              key={i}
              fileId={item.id}
              fileName={item.value.name}
              createdDate={item.value.date}
              course={item.value.course}
            />
          );
        })
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-center my-4">
              You haven't created any projects yet! Press the "New Project"
              button or click the "+" symbol to get started.
            </div>
            <div className="w-[200px]">
              <img
                alt=""
                src={"/penguinWorking.svg"}
                height={200}
                width={200}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex flex-col justify-center items-center">
        <div className="w-[200px]">
          <img alt="" src={"/penguinWorking.svg"} height={200} width={200} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
