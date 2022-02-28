import React, { useEffect } from "react";
import CourseCard from "../../components/dashboard/CourseCard";
import Navbar from "../../components/general/Navbar";
import ProjectCard from "../../components/dashboard/ProjectCard";
import { addDocument, initUser } from "../../interfaces/FirestoreInterface";
import { readDatabaseDocument, updateDatabaseDocument } from "../../interfaces/RealtimeDBInterface";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  
  useEffect(() => {
    var createdUser = false

    onAuthStateChanged(auth, (user) => {
        if(user.metadata.creationTime === user.metadata.lastSignInTime && !createdUser) {
            createdUser = true
            console.log("new user " + user.metadata)
            initUser()
        } else {
            console.log("old user")
        }
    });
  
    return () => {
      createdUser = true
    }
  }, [])
  

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200">
      <Navbar />
      <div className="w-screen h-[100%]">
        <div className="max-h-[40%] h-[40%]">
          <div
            className="outline outline-1 w-fit"
            onClick={() => {
              addDocument(auth.currentUser.uid, { 
                  name: "hello",
                  text: "Hello World!"
             });
            }}
          >
            Add user
          </div>
          <div className="ml-10 mt-3 mb-3">Your Files:</div>
          <div className="mx-20 bg-gray-200 h-full">
            <ProjectCard
              fileName="test"
              createdDate="22 02 2022"
              creator={ auth.currentUser }
            />
          </div>
        </div>
        <div className="max-h-[50%]">
          <div className="ml-10 mt-10 mb-3">Enrolled Courses:</div>
          <div className="mx-20 bg-gray-200 h-full">
            <CourseCard courseName="test" enrolledDate="22 02 2022" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
