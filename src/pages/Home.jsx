import '../App.css';
import { useEffect, useState } from 'react';
import FirebaseRequests from '../components/FirebaseRequests';
import StorageRequests from '../components/StorageRequests';

function Home() {
  return (
    <div>
      <h2>firebase</h2>
      <FirebaseRequests></FirebaseRequests>
      <h2>cloud storage test</h2>
      <StorageRequests></StorageRequests>
    </div>
  );
}

export default Home;
