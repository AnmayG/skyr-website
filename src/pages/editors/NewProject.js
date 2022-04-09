import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import { set, push, ref, runTransaction } from "firebase/database";
import { rdb, db, auth } from "../../firebase";
import { addDocumentWithId, addDocumentWithPathWithId } from "../../interfaces/FirestoreInterface";
const sampleCode = `# move forward for 1 second
move(kit, 1, 0.05, -0.12, -0.1)
# turn for 1 second
turn(kit, 1, 1, 0.05, -0.12, -0.1)`;

function NewProjectInterstitialPage() {
  const overallRef = ref(rdb, `/`);
  const dbRef = push(overallRef);
  const projRef = ref(rdb, `/${dbRef.key}/`);
  const projectDocRef = push(projRef);
  const navigate = useNavigate();

  useEffect(() => {
    var dbRefConnected = false;
    set(dbRef, {
      value: sampleCode,
    }).then(() => {
      // TODO: Work out a method to pass this info to the next page in order to save API calls
      addDocumentWithPathWithId(`projects/`, dbRef.key, {
        date: new Date().toDateString(),
        name: "Untitled",
        course: "None",
      }).then((output) => {
        // addDocumentWithPathWithId(`projects/${dbRef.key}/files/`, projectDocRef.key, {
        //   name: "Untitled",
        // }).then((output) => {
        //   addDocumentWithId(auth.currentUser.uid, dbRef.key, {
        //     reference: db.doc(`projects/${dbRef.key}`)
        //   })
        //   navigate(`/editor/?projid=${dbRef.key}`);
        // })
        addDocumentWithId(auth.currentUser.uid, dbRef.key, {
          reference: db.doc(`projects/${dbRef.key}`)
        })
        navigate(`/editor/?projid=${dbRef.key}`);
      });
    });

    return () => {
      // clear memory leak
      dbRefConnected = true;
    };
  }, []);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex items-center justify-center font-extrabold text-4xl">
        {/* TODO: Add an actual loading page instead of this stuff */}
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default NewProjectInterstitialPage;
