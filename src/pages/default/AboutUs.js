import React, { useState } from "react";
import Markdown from "../../components/code-editor/Markdown";
import Navbar from "../../components/general/Navbar";
import FirebaseRequests from "../../components/FirebaseRequests";
import StorageRequests from "../../components/StorageRequests";

export default function AboutUs() {
  const [url, setUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftutorial-1.md?alt=media&token=bec6c1fd-d301-44bd-88aa-e453b1ab7a60"
  );

  return (
    <div>
      <Navbar />
      <div className="w-screen flex flex-col items-center justify-center">
        <p className="w-full text-center m-8 text-2xl font-bold">
          This page is under development! Sorry!
        </p>
        <img alt="" src={"/penguin404.svg"} height={200} width={200} />
        <div className="h-[2px] w-[300px] bg-gray-200" />
      </div>
      {/* <div className="m-2">
        <div>
          <h2 className="font-bold text-xl">firebase</h2>
          <FirebaseRequests></FirebaseRequests>
          <br></br>
          <h2 className="font-bold text-xl">cloud storage test</h2>
          <StorageRequests
            setChildData={(url) => {
              console.log(url.url);
              setUrl(url.url);
            }}
          ></StorageRequests>
        </div>
        <p>Output URL: {url}</p>
        <Markdown downloadUrl={url} />
      </div> */}
    </div>
  );
}
