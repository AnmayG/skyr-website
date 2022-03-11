import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

function initUser() {
  db.collection("/users/")
    .doc(auth.currentUser.uid)
    .set({
      name: auth.currentUser.displayName,
      date: new Date(auth.currentUser.metadata.creationTime),
    })
    .then(() => {
      // TODO: Figure out a way to condense this into one API call
      db.collection("/users/" + auth.currentUser.uid + "/documents/")
        .doc()
        .set({
          name: "My First Project",
          date: new Date().getDate(),
        });
    });
}

async function addDocument(userID, documentMetaData) {
  db.collection("/users/" + userID + "/documents/")
    .doc()
    .set(documentMetaData)
    .then(() => {
      console.log("Addition successful");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function addDocumentWithID(userID, documentID, documentMetaData) {
  db.collection("/users/" + userID + "/documents")
    .doc(documentID)
    .set(documentMetaData)
    .then(() => {
      console.log("Addition with ID successful");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function readFirestoreUserDocumentData(userID, documentID) {
  return await db
    .doc(`/users/${userID}/documents/${documentID}`)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function listUserFirestoreDocuments(userId) {
  var docDataList = []
  db
    .collection(`/users/${userId}/documents/`)
    .onSnapshot((list) => {
      list.docs.forEach((doc) => {
        docDataList.push({id: doc.id, value: doc.data()})
        // .then((docData) => {
        //   docDataList.push(docData)
        // })
      });
      // console.log("this is running in firestore interface", docDataList)
    });
  return docDataList
}

function updateFirestoreItem() {}

function deleteFirestoreItem() {}

export {
  initUser,
  addDocument,
  addDocumentWithID,
  readFirestoreUserDocumentData,
  listUserFirestoreDocuments,
  updateFirestoreItem,
  deleteFirestoreItem,
};
