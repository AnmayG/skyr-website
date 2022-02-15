import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CodeEditor from "../components/CodeEditor"
import Markdown from '../components/Markdown'
import StorageRequests from '../components/StorageRequests'
import io from 'socket.io-client'

const Editor = () => {
    // Markdown state
    const [urls, setUrls]             = useState([])
    
    // Connection state
    const [isConnected, setConnected] = useState(false)
    const [ipAddress, setIpAddress]   = useState("http://10.0.0.237:9000")
    const [socket, setSocket]         = useState(null)

    // LED vars
    const [redOn, setRedOn]           = useState(false)
    const [blueOn, setBlueOn]         = useState(false)
    const [greenOn, setGreenOn]       = useState(false)

    useEffect(() => {
        const newSocket = io(ipAddress, { transports : ['websocket'] });
        newSocket.on("connect", () => {
            console.log("connected to " + ipAddress)
            setConnected(true)
        })
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    function buttonEventSend(type) {
        if(!isConnected) {
            alert("Server disconnected")
        }

        // TODO: Fix this terrible code it sucks :(
        switch(type) {
            case "red":
                setRedOn(!redOn)
                break;
            case "blue":
                setBlueOn(!blueOn)
                break;
            case "green":
                setGreenOn(!greenOn)
                break;
        }

        console.log(redOn, blueOn, greenOn)
    }

    return (
        <div className=''>
            <Navbar />
            <div className="w-2/3 inline-block align-top m-0 border-black border-0">
                <CodeEditor />
            </div>
            <div className='h-full w-1/3 inline-block m-0'>
                <div className='h-7 text-base w-full border-2 border-l-0 border-black'>
                    Tutorials
                </div>
                {/* <StorageRequests urls={urls} className="p-2"/> */}
                <div className='h-[31rem] overflow-auto border-2 border-black border-l-0 border-t-0'>
                    <Markdown downloadUrl={"https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftest.md?alt=media&token=cd1f6cdd-e17c-47c3-bcc9-30a853b535a9"}/>
                </div>
            </div>
            <div className='w-[90%] border-2 border-black inline-block align-top p-[10px]'>
                <p className="">RGB LED IoT Appliation</p>
                <div className="">
                    <div className="bg-red-500 text-center" onClick={() => {buttonEventSend("red")}}>Red</div>
                    <div className="bg-green-500 text-center" onClick={() => {buttonEventSend("blue")}}>Green</div>
                    <div className="bg-blue-500 text-center" onClick={() => {buttonEventSend("green")}}>Blue</div>
                </div>
            </div>
            <div className='w-[10%] border-2 border-black border-l-0 inline-block align-top p-[10px]'>
                Here2
            </div>
        </div>
    )
}

/*
 While the beginning of the imperialist movement saw a wide prevalence of ideas like Poor Man's Burden that served to
 demonize imperialization, over time these attitudes shifted to become pro-imperialist, resulting in the induction of
 territories and states like Hawaii and Puerto Rico into the US.
 */

export default Editor