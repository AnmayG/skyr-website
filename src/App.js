import logo from './logo.svg';
import './App.css';
import { db, auth } from "./firebase"
import { ref, set } from "firebase/database"
import { useEffect, useState } from 'react';
import FirebaseRequests from './components/FirebaseRequests';

function App() {
  return (
    <div>
      <span>firebase</span>
      <FirebaseRequests></FirebaseRequests>
      <span>cloud storage test</span>
    </div>
  );
}

export default App;
