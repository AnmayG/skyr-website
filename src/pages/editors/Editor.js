import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
import Markdown from "../../components/code-editor/Markdown";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { rdb, db, auth } from "../../firebase";
import { set, ref, onValue, runTransaction } from "firebase/database";
import {
  readDatabaseDocument,
  updateDatabaseDocument,
} from "../../interfaces/RealtimeDBInterface";

const Editor = (props) => {
  // URL Params
  const [params] = useSearchParams();
  const docId = params.get("id");
  const dbRef = ref(rdb, `/${docId}`);
  const navigate = useNavigate();

  // Markdown state
  const [url] = useState(
    "https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftest.md?alt=media&token=cd1f6cdd-e17c-47c3-bcc9-30a853b535a9"
  );

  // Connection state
  const [isConnected, setConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState("http://10.0.0.237:9000");
  const [socket, setSocket] = useState(null);

  // LED vars for testing
  const [redOn, setRedOn] = useState(false);
  const [blueOn, setBlueOn] = useState(false);
  const [greenOn, setGreenOn] = useState(false);

  // CodeMirror state
  const [sentCodeString, setSentCodeString] = useState(``);
  // start()
  // set_outputs(26, 19, 13)
  // turn_off(26, 19, 13)

  // while True:
  //   blink(26, 0.2)
  //   blink(19, 0.2)
  //   blink(13, 0.2)
  const [recCodeString, setRecCodeString] = useState("");

  // Websocket Connection
  useEffect(() => {
    const newSocket = io(ipAddress, { transports: ["websocket"] });
    newSocket.on("connect", () => {
      setConnected(true);
    });
    newSocket.on("disconnect", () => {
      setConnected(false);
    });

    newSocket.on("program-output", () => {
      // print program logs
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket, ipAddress]);

  // Check document exists else navigate to 404
  useEffect(() => {
    // If no ID provided/new project has been created
    if(!docId) {
      // Create new document
    }

    var dbRefConnected = false;
    onValue(dbRef, (snapshot) => {
      if (snapshot.val() && !dbRefConnected) {
        const data = snapshot.val().value;
        setSentCodeString(data);
      } else if (snapshot.val() === null) {
        navigate("/404");
      }
    });
    return () => {
      dbRefConnected = true;
    };
  }, []);

  function buttonEventSend(type) {
    if (!isConnected) {
      alert("Server disconnected");
    }
    var red = redOn;
    var blue = blueOn;
    var green = greenOn;

    // TODO: Fix this terrible code it sucks :(
    switch (type) {
      case "red":
        setRedOn(!redOn);
        red = !redOn;
        break;
      case "blue":
        setBlueOn(!blueOn);
        blue = !blueOn;
        break;
      case "green":
        setGreenOn(!greenOn);
        green = !greenOn;
        break;
      default:
        console.log("how");
    }

    socket.emit("led-toggle", {
      r: red,
      g: green,
      b: blue,
    });
  }

  function pushPythonCode() {
    if (!isConnected) alert("Server disconnected");

    socket.emit("python-push", {
      code: `from lib import *\n ${recCodeString}`,
    });
  }

  function disconnect() {
    if (!isConnected) alert("Server disconnected");

    socket.emit("python-kill", {
      command: "stop",
    });
  }

  function databaseTransaction(codeString) {
    setRecCodeString(codeString);
    const uid = auth.currentUser.uid;
    runTransaction(dbRef, (transaction) => {
      if (transaction) {
        // Set the value
        transaction.value = codeString;
      }
      return transaction;
    });
  }

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-start">
        <div className="w-full">
          <div className="h-7 text-base border-2 border-black ml-2 flex justify-between">
            <div className="ml-2">Code Header</div>
            <div
              onClick={() => {
                databaseTransaction(recCodeString);
              }}
              className="mr-2"
            >
              Save
            </div>
          </div>
          <div className="w-full align-top ml-2 border-black border-0">
            <CodeEditor
              setChildData={(codeString) => {
                databaseTransaction(codeString);
              }}
              CodeValue={sentCodeString}
            />
          </div>
        </div>
        <div className="h-[31rem] mr-2">
          <div className="h-7 text-base w-full border-2 border-l-0 border-black">
            Tutorials
          </div>
          {/* <StorageRequests setUrl={setUrl} className="p-2"/> */}
          <div className="h-full w-full overflow-y-auto border-2 border-black border-t-0">
            <Markdown downloadUrl={url} />
          </div>
        </div>
      </div>

      <div className="w-[90%] border-2 border-black inline-block align-top p-[10px]">
        <div className="">
          <div
            className="bg-red-500 text-center m-2"
            onClick={() => {
              buttonEventSend("red");
            }}
          >
            Red
          </div>
          <div
            className="bg-green-500 text-center m-2"
            onClick={() => {
              buttonEventSend("green");
            }}
          >
            Green
          </div>
          <div
            className="bg-blue-500 text-center m-2"
            onClick={() => {
              buttonEventSend("blue");
            }}
          >
            Blue
          </div>
        </div>
      </div>
      <div className="w-[10%] border-2 border-black border-l-0 inline-block align-top p-[10px] overflow-auto h-[128px]">
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setIpAddress("http://" + e.target.value + ":9000");
            }
          }}
          placeholder={ipAddress}
        />
        <div>Joined: {isConnected.toString()}</div>
        <div
          className="bg-blue-200 text-center m-2 rounded-full"
          onClick={pushPythonCode}
        >
          Push
        </div>
        <div
          className="bg-red-200 text-center m-2 rounded-full"
          onClick={() => {
            disconnect();
          }}
        >
          Stop
        </div>
      </div>
    </div>
  );
};

export default Editor;