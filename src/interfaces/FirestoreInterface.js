import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

function initUser() {
  db.collection("/users/")
    .doc(auth.currentUser.uid)
    .set({
      name: auth.currentUser.displayName,
      date: new Date(auth.currentUser.metadata.creationTime),
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

async function updateFirestoreItemName(userID, documentID, newName) {
  db.doc(`/users/${userID}/documents/${documentID}`).update({
    name: newName,
  });
}

function deleteFirestoreItem(userID, documentID) {
  db.doc(`/users/${userID}/documents/${documentID}`).delete();
}

export {
  initUser,
  addDocument,
  addDocumentWithID,
  readFirestoreUserDocumentData,
  updateFirestoreItemName,
  deleteFirestoreItem,
};
