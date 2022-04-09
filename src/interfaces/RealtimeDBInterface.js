import { rdb, db, auth } from "../firebase";
import { set, ref, onValue, runTransaction, remove } from "firebase/database";

function updateDatabaseDocument(documentID, text) {
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

async function deleteDatabaseDocument(dbRef) {
  remove(dbRef);
}

async function completeTransaction(dbRef, codeString) {
  console.log(dbRef);
  await runTransaction(dbRef, (transaction) => {
    if (transaction) {
      // Set the value
      transaction.value = codeString;
    }
    return transaction;
  });
}

export {
  updateDatabaseDocument,
  readDatabaseDocument,
  deleteDatabaseDocument,
  completeTransaction,
};
