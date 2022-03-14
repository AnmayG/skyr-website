import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase";
import ProjectCard from "./ProjectCard";

function ProjectsList() {
  const [docDataList, setDocDataList] = useState([])
  const docDataListRef = useRef([])
  
  useEffect(() => {
    console.log("here")
    var cleanedUpDbListener = false;
    // Sets up a firestore listener for the documents
    if(!cleanedUpDbListener) {
        db.collection(`/users/${auth.currentUser.uid}/documents/`).onSnapshot((list) => {
            console.log("list:", list.docs);
            var tempList = [];
            for (const doc of list.docs) {
              console.log("ofdodsabno ", tempList);
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
    <div className="mx-20 overflow-y-auto max-h-[35vh]">
      {console.log("dataList:", docDataList)}
      {docDataList.map((item, i) => {
        console.log(`forEach:${item}`);
        return (
          <ProjectCard
            key={i}
            fileId={item.id}
            fileName={item.value.name}
            createdDate={item.value.date}
            course={item.value.course}
          />
        );
      })}
    </div>
  );
}

export default ProjectsList;
