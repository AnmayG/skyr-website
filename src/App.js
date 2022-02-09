import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function HomeScreen({history}) {
  return(
    <Home history={history}/>
  )
}

function App() {
  return (
    // <div>
    //   <h2>firebase</h2>
    //   <FirebaseRequests></FirebaseRequests>
    //   <h2>cloud storage test</h2>
    //   <StorageRequests></StorageRequests>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
