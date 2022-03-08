import React, { useState, useEffect } from "react";
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
  const [projects, setProjects] = useState([]);

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
      console.log(user.uid);
      listUserFirestoreDocuments(user.uid);
    });

    return () => {
      createdUser = true;
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-white">
      <Navbar />
      <div className="w-screen h-[100%]">
        <div className="max-h-[40%] h-[40%]">
          <div
            className="outline outline-1 w-fit"
            onClick={() => {
              addDocument(auth.currentUser.uid, {
                name: "hello",
                text: "Hello World!",
                date: new Date().toDateString(),
              });
            }}
          >
            Add document
          </div>
          <div className="ml-10 mt-3 mb-3">Your Files:</div>
          <div className="mx-20 h-full">
            {}
            <ProjectCard
              fileName="test"
              createdDate="22 02 2022"
              creator={auth.currentUser}
            />
          </div>
        </div>
        <div className="max-h-[50%]">
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
