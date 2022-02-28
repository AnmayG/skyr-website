import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/default/LandingPage";
import AboutUs from "./pages/default/AboutUs";
import Editor from "./pages/editors/Editor";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/authentication/LogIn";
import SignUp from "./pages/authentication/SignUp";
import Confirmation from "./pages/authentication/Confirmation";
import PasswordReset from "./pages/authentication/PasswordReset";
import Dashboard from "./pages/editors/Dashboard";
import RequireAuth from "./pages/authentication/RequireAuth";

function App() {
  return (
    // <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/editor/" element={<Editor />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/confirm" element={<Confirmation />} />
        <Route exact path="/passwordreset" element={<PasswordReset />} />
        <Route
          exact path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
