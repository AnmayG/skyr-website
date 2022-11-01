import { Mail, NoBackpackSharp, Phone } from "@mui/icons-material";
import React from "react";

function Footer() {
  return (
    <div className="bg-slate-400">
      <div className="px-10 py-2">
        <div className="flex justify-between">
          <div className="py-2 flex justify-center items-center whitespace-nowrap">
            <img src="../../skyr-logo.svg" className="h-12 mr-2" alt=""></img>
            <div>
              <p className="text-xl font-bold cursor-pointer shrink-0 mr-8">
                SkyRobotics
              </p>
              <p className="italic cursor-pointer shrink-0 mr-8">
                Ground Level Control; Sky High Performance
              </p>
            </div>
          </div>
          <div>
            <div className="flex text-lg">
              <Mail className="pr-2"/>
              anmaygupta01@gmail.com
            </div>
            <div className="flex text-lg">
              <Phone className="pr-2"/>
              224-607-9132
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
