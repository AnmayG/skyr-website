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

async function addDocument(userId, documentMetaData) {
  db.collection("/users/" + userId + "/documents/")
    .doc()
    .set(documentMetaData)
    .then(() => {
      console.log("Addition successful");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function readFirestoreUserDocumentData(userId, documentID) {
  await db.doc(`/users/${userId}/documents/${documentID}`)
    .get()
    .then((doc) => {
      console.log(doc.data())
      return doc.data
    })
    .catch((error) => {
      console.error(error)
    })
}

function listUserFirestoreDocuments(userId) {
  db.collection(`/users/${userId}/documents/`).onSnapshot((list) => {
    list.docs.forEach((doc) => {
      console.log(doc);
    });
  });
}

function updateFirestoreItem() {}

function deleteFirestoreItem() {}

export {
  initUser,
  addDocument,
  readFirestoreUserDocumentData,
  listUserFirestoreDocuments,
  updateFirestoreItem,
  deleteFirestoreItem,
};
