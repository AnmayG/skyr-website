import { rdb, db, auth } from "../firebase";
import { set, ref, onValue } from "firebase/database";

function updateDatabaseDocument(documentID, text) {
  console.log("written");
  set(ref(rdb, "/" + documentID), {
    value: text,
  });
}

async function readDatabaseDocument(documentID) {
  const dbRef = ref(rdb, "/" + documentID);
  await onValue(dbRef, (snapshot) => {
    if (snapshot.val() !== null) {
      const data = snapshot.val().documentText;
      return data;
    } else {
      return null;
    }
  });
}

export { updateDatabaseDocument, readDatabaseDocument };
