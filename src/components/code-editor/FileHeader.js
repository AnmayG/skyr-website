import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  readFirestoreDocumentDataWithPathWithId,
  updateFirestoreItemNameWithPath,
} from "../../interfaces/FirestoreInterface";
import ShareModal from "./modals/ShareModal";
import RenameProjectModal from "./modals/RenameProjectModal";
import useModalState from "./modals/useModalState";

const FileHeader = (props) => {
  const navigate = useNavigate();
  const docId = props.docID;
  const nameObj = useRef({ name: props.tempName });
  const [name, setName] = useState(props.tempName);

  const [renameModalOpen, handleRenameModalOpen, handleRenameModalClose] =
    useModalState(false);

  const [shareModalOpen, handleShareModalOpen, handleShareModalClose] =
    useModalState(false);

  useEffect(() => {
    var docMetaDataFetched = false;
    onAuthStateChanged(auth, (user) => {
      if (!docMetaDataFetched) {
        readFirestoreDocumentDataWithPathWithId(`/projects`, docId)
          .then((doc) => {
            nameObj.current.name = doc.name;
            setName(doc.name);
          })
          .catch((error) => {
            console.error(error);
            navigate("/404");
          });
      }
    });

    return () => {
      docMetaDataFetched = true;
    };
  }, []);

  function updateName(newName) {
    setName(newName);
    updateFirestoreItemNameWithPath(`/projects`, docId, newName);
  }

  return (
    <div className="flex w-full h-[5vh] bg-slate-200 justify-between items-center px-2">
      <div className="">
        <div className="text-lg">
          {/* This needs to contain the course name, course part, and file name. The NavBar may need to be replaced with just an image. */}
          {name}
        </div>
      </div>
      <div className="flex">
        <button
          className="border-2 border-blue-400 text-blue-400 rounded-lg p-1 mx-1"
          onClick={handleRenameModalOpen}
        >
          Rename
        </button>
        <button
          className="border-2 border-blue-400 text-blue-400 rounded-lg p-1 mx-1"
          onClick={handleShareModalOpen}
        >
          Share
        </button>
      </div>
      <RenameProjectModal
        modalOpen={renameModalOpen}
        handleClose={handleRenameModalClose}
        updateName={updateName}
        placeholderName={name}
      />
      <ShareModal
        modalOpen={shareModalOpen}
        handleClose={handleShareModalClose}
      />
    </div>
  );
};

export default FileHeader;
