import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpCall() {
  return (
    <div className="bg-slate-700 w-full relative">
      <div className="w-full">
        <img className="object-fill" src="./blob-scene.svg" alt="" />
      </div>
      <div class="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex w-full"
        >
          <div className="flex flex-col">
            <p className="text-3xl text-white font-bold text-center">
              Sign up for a free SkyRobotics account and start coding today
            </p>
            <div className="flex items-center justify-center">
              <Link
                style={{ textDecoration: "none" }}
                className="mt-4 w-fit justify-center text-2xl text-center bg-blue-400 font-bold text-white rounded-3xl p-2 px-4"
                to="/signup"
              >
                Sign Up For Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpCall;
