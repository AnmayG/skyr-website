import React, { useState, useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rdb, db, auth } from "../../firebase";
import { set, ref, onValue, runTransaction } from "firebase/database";

function CommunityEditor() {
  const [params] = useSearchParams();
  const docId = params.get("id");
  const dbRef = ref(rdb, `/${docId}`);
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to 404 if doc does not exist
    var dbRefConnected = false;
    onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null && !dbRefConnected) {
        const data = snapshot.val().value;
      } else if (snapshot.val() === null) {
        navigate("/404");
      }
    });

    return () => {
      // Clear up the async to prevent memory leaks
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
