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
  db.collection("/users/" + userID + "/projects/")
    .doc()
    .set(documentMetaData)
    .then(() => {
      console.log("Addition successful");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function addDocumentWithId(userID, documentID, documentMetaData) {
  db.collection("/users/" + userID + "/projects")
    .doc(documentID)
    .set(documentMetaData)
    .then(() => {
      console.log("Addition with ID successful");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function addDocumentWithPathWithId(path, documentID, documentMetaData) {
  alert(path)
  db.collection(path)
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
    .doc(`/users/${userID}/projects/${documentID}`)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function readFirestoreDocumentDataWithPathWithId(path, documentId) {
  return await db
    .doc(`${path}/${documentId}`)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function updateFirestoreItemName(userID, documentID, newName) {
  db.doc(`/users/${userID}/projects/${documentID}`).update({
    name: newName,
  });
}

async function updateFirestoreItemNameWithPath(path, documentID, newName) {
  db.doc(`${path}/${documentID}`).update({
    name: newName,
  });
}

function deleteFirestoreItem(path, documentID) {
  if (path.slice(-1) === "/") path.slice(0, -1);
  console.log(`${path}/${documentID}`);
  db.doc(`${path}/${documentID}`).delete();
  // TODO: Delete all firebase entries as well
}

export {
  initUser,
  addDocument,
  addDocumentWithId,
  addDocumentWithPathWithId,
  readFirestoreUserDocumentData,
  readFirestoreDocumentDataWithPathWithId,
  updateFirestoreItemName,
  updateFirestoreItemNameWithPath,
  deleteFirestoreItem,
};
