import React, { useState, useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rdb, db, auth } from "../../firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore"
// import { set, ref, onValue, runTransaction } from "firebase/database";

function CommunityEditor() {
  const [params] = useSearchParams();
  const docId = params.get("id");
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  async function getDocument(reference) {
    const docSnap = await getDoc(reference);
    if(docSnap.exists()) {
      const data = docSnap.data()
      console.log("document data", data);
      return data;
    } else {
      navigate("/404")
    }
  }

  useEffect(() => {
    // Navigate to 404 if doc does not exist
    var dbRefConnected = false;
    const dbRef = null
    if(docId) {
      // Document id exists; check if its a valid path
      const dbRef = doc(db, "community", docId);
      getDocument(dbRef);
    } else {
      // Document id does not exist; right now 404 but later new project
      navigate("/404")
    }
    
    // onSnapshot(dbRef, (doc) => {
    //   const data = doc.data()
    //   console.log(data)
    //   if (data && !dbRefConnected) {
    //     console.log("here", data)
    //     setLoading(true)
    //   } else if (data === null) {
    //     navigate("/404");
    //   }
    // });

    return () => {
      // Clear up the async to prevent memory leaks
      dbRefConnected = true;
    };
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <div>Here</div>
    </div>
  );
}

export default CommunityEditor;
