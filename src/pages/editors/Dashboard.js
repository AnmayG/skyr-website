import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/dashboard/CourseCard";
import Navbar from "../../components/general/Navbar";
import ProjectCard from "../../components/dashboard/ProjectCard";
import { addDocument, initUser } from "../../interfaces/FirestoreInterface";
import {
  readDatabaseDocument,
  updateDatabaseDocument,
} from "../../interfaces/RealtimeDBInterface";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProjectsList from "../../components/dashboard/ProjectsList";
import CoursesList from "../../components/dashboard/CoursesList";
import { Add } from "@mui/icons-material";

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
    <div className="flex flex-col w-screen h-screen bg-slate-200">
      <Navbar />
      <div className="w-screen">
        <div className="max-h-[40vh]">
          <div className="mx-20">
            <div className="flex justify-between w-full pt-3 m`r-3">
              <div className="flex justify-start items-center">
                <div className="ml-10">Project Name</div>
              </div>
              <div className="flex justify-end items-center">
                <div className="mr-12">Created Date</div>
                <Add
                  className="mr-2"
                  onClick={() => {
                    navigate("/newproject");
                  }}
                >
                  New Project
                </Add>
              </div>
            </div>
            <div className="h-1 bg-slate-300 mb-2 mt-0"></div>
          </div>
          <ProjectsList />
          {/* <div className="max-h-[50vh]">
            <div className="ml-10 mt-10 mb-3">Enrolled Courses:</div>
            <CoursesList />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
