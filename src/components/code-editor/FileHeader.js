import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  readFirestoreDocumentDataWithPathWithId,
  updateFirestoreItemNameWithPath,
} from "../../interfaces/FirestoreInterface";
import { Modal } from "@mui/material";
import ShareModal from "./modals/ShareModal";

const FileHeader = (props) => {
  const navigate = useNavigate();
  const docId = props.docID;
  const nameObj = useRef({ name: props.tempName });
  const [name, setName] = useState(props.tempName);

  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const handleRenameModalOpen = () => setRenameModalOpen(true);
  const handleRenameModalClose = () => setRenameModalOpen(false);
  const renameModalInputRef = useRef(null);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const handleShareModalOpen = () => setShareModalOpen(true);
  const handleShareModalClose = () => setShareModalOpen(false);
  const shareModalInputRef = useRef(null);

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
          {/* <input
            className="ml-2 overflow-auto bg-slate-200"
            defaultValue={name}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("here");
                updateFirestoreItemNameWithPath(
                  `/projects`,
                  docId,
                  event.target.value
                );
                event.currentTarget.blur();
              }
            }}
          /> */}
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
      <Modal open={renameModalOpen} onClose={handleRenameModalClose}>
        <div
          className={
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white text-black border-2 border-solid border-white shadow-md p-4"
          }
        >
          <div className="text-2xl font-normal leading-normal mt-0 mb-2">
            Rename Project
          </div>
          <div className="border-black border">
            <input
              autoFocus
              className="bg-white p-3 w-full"
              placeholder={name}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateName(event.target.value);
                  handleRenameModalClose();
                }
              }}
              ref={renameModalInputRef}
            />
          </div>
          <div className="flex mt-2">
            <button
              className="bg-blue-500 p-1 mr-1 text-lg text-white font-semibold"
              onClick={(event) => {
                event.stopPropagation();
                updateName(renameModalInputRef.current.value);
                handleRenameModalClose();
              }}
            >
              Rename
            </button>
            <button
              className="border-black border p-1 text-lg"
              onClick={() => {
                handleRenameModalClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={shareModalOpen} onClose={handleShareModalClose}>
        <ShareModal handleClose={handleShareModalClose} />
      </Modal>
    </div>
  );
};

export default FileHeader;
