import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

function TutorialsIntro() {
  return (
    <div className="px-10 pt-2 pb-4">
      <div className="mt-8 flex items-center">
        <div className="overflow-hidden w-1/2 h-full">
          <img src="/tutorials-pic.png" alt="IDE Picture" />
        </div>
        <div className="w-1/2 items-center">
          <div className="pl-4">
            <div className="text-xl font-bold text-left">
              Educational Tutorials
            </div>
            <div className="leading-loose">
              SkyRobotics offers helpful tutorials that teach kids how to interact with computers and robotics on an easily understandable level, making the complex simple.
            </div>
            <div className="flex">
              <Link
                style={{ textDecoration: "none" }}
                className="font-bold mt-3"
                to="/newproject"
              >
                Start Learning
                <ChevronRight className="text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialsIntro;
