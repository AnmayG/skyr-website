import { ChevronRight } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

function IDEIntro() {
  return (
    <div className="w-full h-[85vh] bg-white">
      <div className="p-10">
        <div className="text-2xl font-bold text-center">
          Expert Robotics Made <b>Accessible</b>
        </div>
        <div className="text-lg text-center">
          Sky Robotics offers a clear, easy way to get students <b>interested</b> in robotics.
        </div>
        <div className="mt-8 flex items-center">
          <div className="overflow-hidden w-1/2 h-full">
            <img src="/ide-pic.png" alt="IDE Picture" />
          </div>
          <div className="w-1/2 items-center">
            <div className="pl-4">
              <div className="text-xl font-bold text-left">
                Online IDE
              </div>
              <div className="leading-loose">
                SkyRobotics allows students to write, run, and debug code directly in the browser, skipping the hassle of downloads and digging directly into the heart of coding.
              </div>
              <div className="flex">
                <Link
                  style={{textDecoration: "none"}}
                  className="font-bold mt-3"
                  to="/newproject"
                >
                  Start Coding
                  <ChevronRight className="text-blue-500"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IDEIntro;
