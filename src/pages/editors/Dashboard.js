import React, { useState, useEffect } from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const sampleDocData = [
    { course: "None", date: "Tue Mar 08 2022", name: "Untitled" },
    { course: "One", date: "Wed Mar 09 2022", name: "Untitled1" },
    { course: "Two", date: "Tue Mar 08 2022", name: "Untitled2" },
    { course: "Three", date: "Tue Mar 08 2022", name: "Untitled3" },
    { course: "Four", date: "Tue Mar 08 2022", name: "Untitled4" },
    { course: "Five", date: "Tue Mar 08 2022", name: "Untitled5" },
    { course: "Six", date: "Tue Mar 08 2022", name: "Untitled6" },
    { course: "Seven", date: "Tue Mar 08 2022", name: "Untitled7" },
    { course: "Eight", date: "Tue Mar 08 2022", name: "Untitled8" },
  ];

  useEffect(() => {
    var createdUser = false;

    onAuthStateChanged(auth, (user) => {
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
      listUserFirestoreDocuments(user.uid)
        .then((list) => {
          console.log(list)
        })
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
              navigate("/newproject")
            }}
          >
            New Project
          </div>
          <div className="ml-10 mt-3 mb-3">Your Files:</div>
          <div className="mx-20 overflow-y-auto max-h-[35vh]">
            {sampleDocData.map((docData) => {
              console.log("here", docData)
              return (
                <ProjectCard
                  fileName={docData.name}
                  createdDate={docData.date}
                  course={docData.course}
                />
              );
            })}
          </div>
        </div>
        <div className="max-h-[50vh]">
          <div className="ml-10 mt-10 mb-3">Enrolled Courses:</div>
          <div className="mx-20 bg-white h-full">
            <CourseCard courseName="test" enrolledDate="22 02 2022" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
