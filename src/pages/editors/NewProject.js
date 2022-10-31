import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import { set, push, ref, runTransaction } from "firebase/database";
import { rdb, db, auth } from "../../firebase";
import {
  addDocumentWithId,
  addDocumentWithPathWithId,
} from "../../interfaces/FirestoreInterface";
// const sampleCode = `# move forward at full power for 1 second
// move(kit=kit, delay=1, power=1)
// # turn motor 1 at full power for 1 second
// turn(kit=kit, delay=1, motor=1, power=1)
// # spin at full power for one second
// spin_turn(kit, delay=1, power=1)
// `;

function NewProjectInterstitialPage() {
  const overallRef = ref(rdb, `/projects/`);
  const dbRef = push(overallRef);
  const projRef = ref(rdb, `/projects/${dbRef.key}/`);
  const projectDocRef = push(projRef);
  const navigate = useNavigate();

  useEffect(() => {
    var dbRefConnected = false;
    if (!dbRefConnected) {
      set(projectDocRef, {
        name: "Main",
        value: "",
      }).then(() => {
        // TODO: Work out a method to pass this info to the next page in order to save API calls
        addDocumentWithPathWithId(`projects/`, dbRef.key, {
          date: new Date().toDateString(),
          name: "Untitled",
          course: "None",
          memberIds: [auth.currentUser.uid],
          ownerId: auth.currentUser.uid,
        })
          .then((output) => {
            addDocumentWithId(auth.currentUser.uid, dbRef.key, {
              reference: db.doc(`projects/${dbRef.key}`),
            }).then(() => {
              navigate(`/editor/?projid=${dbRef.key}`);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }

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
