import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Editor from './pages/Editor';

function HomeScreen({history}) {
  return(
    <Home history={history}/>
  )
}

function AboutUsScreen({history}) {
  return(
    <AboutUs history={history}/>
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
        <Route exact path="/aboutus" element={<AboutUsScreen />} />
        <Route exact path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
