import React from "react";
import Markdown from "../components/Markdown";
import Navbar from '../components/Navbar'
import FirebaseRequests from "../components/FirebaseRequests";
import StorageRequests from "../components/StorageRequests";

export default function AboutUs() {
    return(
        <div>
            <Navbar />
            <div>
                <h2>firebase</h2>
                <FirebaseRequests></FirebaseRequests>
                <h2>cloud storage test</h2>
                <StorageRequests></StorageRequests>
            </div>
            <Markdown></Markdown>
            {/* <h1 className="text-3xl font-bold underline">

            </h1> */}
        </div>
    )
}