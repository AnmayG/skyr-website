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
          <button
            className="m-4 rounded-full bg-green-500 p-4 text-white font-extrabold text-xl"
            onClick={() => {
              navigate("/mdeditor");
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;
