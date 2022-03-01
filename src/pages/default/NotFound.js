import React from "react";
import Navbar from "../../components/general/Navbar";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex flex-col items-center justify-center">
        <p className="w-full text-center m-8 text-2xl font-bold">
          404: Page Not Found
        </p>
        <img alt="" src={"penguin404.svg"} height={200} width={200} />
        <div className="h-[2px] w-[300px] bg-gray-200" />
      </div>
    </div>
  );
};

export default NotFound;
