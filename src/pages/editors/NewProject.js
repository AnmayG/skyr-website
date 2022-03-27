import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import { set, push, ref, runTransaction } from "firebase/database";
import { rdb, db, auth } from "../../firebase";
import { addDocumentWithID } from "../../interfaces/FirestoreInterface";
const sampleCode = `start()
set_outputs(26, 19, 13)
turn_off(26, 19, 13)

while True:
  blink(26, 0.2)
  blink(19, 0.2)
  blink(13, 0.2)`;

function NewProjectInterstitialPage() {
  const overallRef = ref(rdb, `/`);
  const dbRef = push(overallRef);
  const navigate = useNavigate();


  useEffect(() => {
    var dbRefConnected = false;
    set(dbRef, {
      value: sampleCode,
    }).then(() => {
      // TODO: Work out a method to pass this info to the next page in order to save API calls
      addDocumentWithID(auth.currentUser.uid, dbRef.key, {
        date: new Date().toDateString(),
        name: "Untitled",
        course: "None",
      }).then((output) => {
        navigate(`/editor/?id=${dbRef.key}`);
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
