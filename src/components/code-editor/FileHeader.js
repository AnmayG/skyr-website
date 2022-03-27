import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { readFirestoreUserDocumentData, updateFirestoreItemName } from "../../interfaces/FirestoreInterface";

const FileHeader = (props) => {
  const docId = props.docID;
  const nameObj = useRef({name: props.tempName})
  const [name, setName] = useState(props.tempName);
  const [course, setCourse] = useState("None");

  useEffect(() => {
    var docMetaDataFetched = false;
    onAuthStateChanged(auth, (user) => {
      if (!docMetaDataFetched) {
        readFirestoreUserDocumentData(user.uid, docId)
          .then((doc) => {
            nameObj.current.name = doc.name;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    return () => {
      docMetaDataFetched = true;
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-[5vh] bg-slate-200 justify-center">
      <div className="mx-2">
        <div className="text-lg" key={nameObj.current.name}>
          {/* This needs to contain the course name, course part, and file name. The NavBar may need to be replaced with just an image. */}
          Project Name:
          <input
            className="ml-2 overflow-auto w-50 bg-slate-200"
            defaultValue={nameObj.current.name}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("here");
                updateFirestoreItemName(
                  auth.currentUser.uid,
                  docId,
                  event.target.value
                );
                event.currentTarget.blur()
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileHeader;
