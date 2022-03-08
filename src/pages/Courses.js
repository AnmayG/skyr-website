import React from "react";
import Navbar from "../components/general/Navbar";

const Courses = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex flex-col items-center justify-center">
        <p className="w-full text-center m-8 text-2xl font-bold">
          This page is under development!
        </p>
        <img alt="" src={"/penguinWorking.svg"} height={200} width={200} />
        <div className="h-[2px] w-[300px] bg-gray-200" />
        <p className="w-full text-center m-8 text-2xl font-bold">
          We're working very hard to get it up and running.
        </p>
      </div>
    </div>
  );
};

export default Courses;
