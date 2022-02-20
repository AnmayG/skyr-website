import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Editor from './pages/Editor';
import Courses from './pages/Courses';
import Community from './pages/Community';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/editor" element={<Editor />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
