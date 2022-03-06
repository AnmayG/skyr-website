import React from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";
import { useNavigate } from "react-router-dom";

const CommunityHome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="h-full">
          <div className="flex items-center justify-center">
            <div className="w-screen flex flex-col items-center justify-center">
            <p className="w-full text-center m-8 text-2xl font-bold">
              This page is under development!
            </p>
            <img alt="" src={"/penguin404.svg"} height={200} width={200} />
            <div className="h-[2px] w-[300px] bg-gray-200" />
            <p className="w-full text-center m-8 text-2xl font-bold">
              We're working very hard to get it up and running.
            </p>
          </div>
          {/* <button
            className="m-4 rounded-full bg-green-500 p-4 text-white font-extrabold text-xl"
            onClick={() => {
              navigate("/mdeditor");
            }}
          >
            Get started
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;
