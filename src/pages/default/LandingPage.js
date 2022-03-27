import Navbar from "../../components/general/Navbar";

function LandingPage() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col h-full ml-20 mr-20">
        <div className="flex items-center h-full">
          <div className="">
            <p className="text-6xl">SkyRobotics</p>
            <div>
              <p className="text-2xl">Ground Level Control</p>
              <p className="text-2xl">Sky High Performance</p>
            </div>
          </div>
        </div>
        <div className="h-full justify-center items-center">
          <img src="/skyr-render.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
