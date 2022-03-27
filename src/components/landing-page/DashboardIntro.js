import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

function DashboardIntro() {
  return (
    <div className="px-10 pt-2">
      <div className="mt-8 flex items-center">
        <div className="w-1/2 items-center">
          <div className="pl-4">
            <div className="text-xl font-bold text-left">Collaborative Dashboard</div>
            <div className="leading-loose">
              SkyRobotics allows students to save and share code among multiple computers, making it perfect for completing group projects and learning as much as they can.
            </div>
            <div className="flex">
              <Link
                style={{ textDecoration: "none" }}
                className="font-bold mt-3"
                to="/newproject"
              >
                Start Coding
                <ChevronRight className="text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-hidden w-1/2 h-full">
          <img src="/ide-pic.png" alt="IDE Picture" />
        </div>
      </div>
    </div>
  );
}

export default DashboardIntro;
