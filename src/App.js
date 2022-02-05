import logo from './logo.svg';
import './App.css';
import { db, auth } from "./firebase"
import { ref, set } from "firebase/database"
import { useEffect, useState } from 'react';
import FirebaseRequests from './components/FirebaseRequests';
import StorageRequests from './components/StorageRequests';

function App() {
  return (
    // <div>
    //   <h2>firebase</h2>
    //   <FirebaseRequests></FirebaseRequests>
    //   <h2>cloud storage test</h2>
    //   <StorageRequests></StorageRequests>
    // </div>
  );
}

export default App;
