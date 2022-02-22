import { db, auth } from "../firebase"
import { useEffect, useState } from 'react';

function addDocument(userId, documentMetaData) {
    db.collection("/users/user-documents/" + userId)
        .doc()
        .set(documentMetaData)
        .then(() => {
            console.log("Addition successful")
            
        }).catch(() => {
            console.error("User addition failed.")
        })
}

function readFirestoreUserDocumentData(userId, documentID) {

}

function updateFirestoreItem() {

}

function deleteFirestoreItem() {

}

export {addDocument, readFirestoreUserDocumentData, updateFirestoreItem, deleteFirestoreItem}