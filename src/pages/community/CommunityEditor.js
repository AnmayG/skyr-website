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
    const docSnap = await reference.get();
    if(docSnap) {
      console.log("document data", docSnap.data());
      return docSnap.data();
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
      const dbRef = db.collection("community").doc(docId);
      var doc = getDocument(dbRef);
      console.log("Doc:", doc)
      if(doc) {
        // valid path
      } else {
        // invalid path
      }
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
      <div className="w-screen flex flex-col items-center justify-center">
        <p className="w-full text-center m-8 text-2xl font-bold">
          This page is under development! Sorry!
        </p>
        <img alt="" src={"/penguin404.svg"} height={200} width={200} />
        <div className="h-[2px] w-[300px] bg-gray-200" />
      </div>
    </div>
  );
}

export default CommunityEditor;
