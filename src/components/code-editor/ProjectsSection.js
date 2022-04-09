import React, { useEffect } from "react";
import { readFirestoreUserDocumentData } from "../../interfaces/FirestoreInterface";
import { auth } from "../../firebase";

function ProjectsSection() {
  useEffect(() => {
    readFirestoreUserDocumentData(auth.currentUser.uid, );

    return () => {};
  }, []);

  return (
    <div>
      <div className="m-1 p-1 text-center w-fit border border-1 border-black">
        New +
      </div>
      <div></div>
    </div>
  );
}

export default ProjectsSection;
