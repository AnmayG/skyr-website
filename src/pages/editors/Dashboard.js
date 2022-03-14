import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/dashboard/CourseCard";
import Navbar from "../../components/general/Navbar";
import ProjectCard from "../../components/dashboard/ProjectCard";
import {
  addDocument,
  listUserFirestoreDocuments,
  initUser,
} from "../../interfaces/FirestoreInterface";
import {
  readDatabaseDocument,
  updateDatabaseDocument,
} from "../../interfaces/RealtimeDBInterface";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProjectsList from "../../components/dashboard/ProjectsList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [docDataList, setDocDataList] = useState([]);
  const docDataListRef = useRef([]);

  useEffect(() => {
    var createdUser = false;
    onAuthStateChanged(auth, async (user) => {
      if (
        user.metadata.creationTime === user.metadata.lastSignInTime &&
        !createdUser &&
        !localStorage.getItem("initialized")
      ) {
        createdUser = true;
        localStorage.setItem("initialized", "true");
        initUser();
      } else {
        console.log("old user");
      }
    });

    return () => {
      createdUser = true;
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-white">
      <Navbar />
      <div className="w-screen">
        <div className="max-h-[40vh]">
          <div
            className="outline outline-1 w-fit"
            onClick={() => {
              navigate("/newproject");
            }}
          >
            New Project
          </div>
          <div className="ml-10 mt-3 mb-3">Your Files:</div>
          <ProjectsList />
          <div className="max-h-[50vh]">
            <div className="ml-10 mt-10 mb-3">Enrolled Courses:</div>
            <div className="mx-20 bg-white h-full">
              <CourseCard courseName="test" enrolledDate="22 02 2022" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
