import Navbar from "../../components/general/Navbar";
import IDEIntro from "../../components/landing-page/IDEIntro";
import { Link, useNavigate } from "react-router-dom";
import DashboardIntro from "../../components/landing-page/DashboardIntro";
import TutorialsIntro from "../../components/landing-page/TutorialsIntro";
import Footer from "../../components/general/Footer";
import QuotesIntro from "../../components/landing-page/QuotesIntro"
import Stats from "../../components/landing-page/Stats";
import SignUpCall from "../../components/landing-page/SignUpCall";

function LandingPage() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col h-[80vh]">
        <div className="h-[80vh] justify-end items-center absolute overflow-hidden">
          <img src="/skyr-render.png" alt="" />
        </div>
        <div
          className="flex items-center h-[80vh] w-full absolute"
          style={{
            background: "linear-gradient(90deg, #00000088 10%, #ffffff44 100%)",
          }}
        >
          <div className="flex flex-col ml-10">
            <p className="text-7xl text-white font-extrabold underline">
              SkyRobotics
            </p>
            <div>
              <p className="text-4xl text-white">Ground Level Control</p>
              <div className="text-5xl text-sky-100 font-bold">
                Sky High Performance
              </div>
            </div>
            <div className="flex">
              <Link
                style={{ textDecoration: "none" }}
                className="mt-4 mr-3 w-fit justify-center text-2xl text-center font-bold text-white rounded-3xl p-2 px-4 outline"
                to="/login"
              >
                Log In
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="mt-4 w-fit justify-center text-2xl text-center bg-blue-400 font-bold text-white rounded-3xl p-2 px-4"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <IDEIntro />
      <DashboardIntro />
      <TutorialsIntro />
      <QuotesIntro />
      <Stats />
      <SignUpCall />
      <Footer />
    </div>
  );
}

export default LandingPage;
