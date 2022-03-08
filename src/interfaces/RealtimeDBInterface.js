import { rdb, db, auth } from "../firebase";
import { set, ref, onValue, runTransaction } from "firebase/database";

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

async function completeTransaction(dbRef, codeString) {
  await runTransaction(dbRef, (transaction) => {
    if (transaction) {
      // Set the value
      transaction.value = codeString;
    }
    return transaction;
  });
}

export { updateDatabaseDocument, readDatabaseDocument, completeTransaction };
