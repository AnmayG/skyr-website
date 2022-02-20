import '../App.css';
import { useEffect, useState } from 'react';
import FirebaseRequests from '../components/FirebaseRequests';
import StorageRequests from '../components/StorageRequests';
import Navbar from '../components/Navbar'

function Home() {

  return (
    <div className="h-screen min-h-screen">
            <Navbar />
            <div className="flex flex-row-reverse ml-20 mr-20">
                <div className="w-1/2">
                    <img src="" />
                </div>
                <div className="flex items-center w-1/2">
                    <div className="space-y-2">
                        <p className="text-6xl">SkyRobotics</p>
                        <div>
                          <p className="text-2xl">Ground Level Control</p>
                          <p className="text-2xl">Sky High Performance</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    // <div>
    //   <Navbar history={history}></Navbar>
    //   {/* <FirebaseRequests></FirebaseRequests>
    //   <h2>cloud storage test</h2>
    //   <StorageRequests></StorageRequests> */}
    // </div>
  );
}

export default Home;
