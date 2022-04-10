import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
import Markdown from "../../components/code-editor/Markdown";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { rdb, db, auth } from "../../firebase";
import {
  set,
  push,
  ref,
  onValue,
  runTransaction,
  orderByChild,
  remove,
} from "firebase/database";
import {
  readDatabaseDocument,
  updateDatabaseDocument,
  completeTransaction,
} from "../../interfaces/RealtimeDBInterface";
import {
  socketLedToggle,
  pushPythonCode,
  disconnect,
} from "../../interfaces/SocketInterface";
import FileHeader from "../../components/code-editor/FileHeader";
import ProjectsSection from "../../components/code-editor/ProjectsSection";
import { Delete, KeyboardArrowDown } from "@mui/icons-material";
const sampleCode = `# move forward for 1 second
move(kit, 1, 0.05, -0.12, -0.1)
# turn for 1 second
turn(kit, 1, 1, 0.05, -0.12, -0.1)`;

const Editor = (props) => {
  // URL Params
  const [params] = useSearchParams();
  const projId = params.get("projid");
  const projRef = ref(rdb, `/${projId}`);
  const dbRef = useRef(null);
  const documentRefListRef = useRef([]);
  const [documentDataList, setDocumentDataList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Markdown state
  const [url] = useState(
    "https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftutorial-1.md?alt=media&token=24b05721-9dd7-4204-9f25-1739f37b2709"
  );

  // Connection state
  const [isConnected, setConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState("http://raspberrypi.local:9000");
  const [socket, setSocket] = useState(null);

  // LED vars for testing
  const [redOn, setRedOn] = useState(false);
  const [blueOn, setBlueOn] = useState(false);
  const [greenOn, setGreenOn] = useState(false);

  // CodeMirror state
  const [sentCodeString, setSentCodeString] = useState(``);
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

  // Check project exists else navigate to 404
  useEffect(() => {
    var dbRefConnected = false;
    onValue(projRef, (snapshot) => {
      if (snapshot.val() && !dbRefConnected) {
        const snapshotData = snapshot.val();
        const tempRefArray = [];
        const tempDataArray = [];
        // Write all document ids to a temporary array
        for (const document in snapshotData) {
          tempRefArray.push(ref(rdb, `/${projId}/${document}`));
          tempDataArray.push(snapshot.val()[document]);
        }
        documentRefListRef.current = tempRefArray;
        setDocumentDataList([...tempDataArray]);
        // If there isn't already a reference set then set it to the main file
        if (!dbRef.current) {
          dbRef.current = tempRefArray[0];
          const data = tempDataArray[0].value;
          setSentCodeString(data);
        }
      } else if (snapshot.val() === null) {
        navigate("/404");
      }
    });
    return () => {
      dbRefConnected = true;
    };
  }, []);

  function addFile() {
    var newFileRef = push(projRef, { name: "Untitled", value: sampleCode });
    documentRefListRef.current.push(newFileRef);
    setDocumentDataList([
      ...documentDataList,
      { name: "Untitled", value: sampleCode },
    ]);
    dbRef.current = newFileRef;
    const data = sampleCode;
    setSentCodeString(data);
  }

  // File Management
  // Send info thorough socket
  function buttonEventSend(type) {
    if (!isConnected) {
      alert("Disconnected from robot");
    }
    var red = redOn;
    var green = greenOn;
    var blue = blueOn;

    // TODO: Fix this terrible code it sucks :(
    switch (type) {
      case "red":
        setRedOn(!redOn);
        red = !redOn;
        break;
      case "green":
        setGreenOn(!greenOn);
        green = !greenOn;
        break;
      case "blue":
        setBlueOn(!blueOn);
        blue = !blueOn;
        break;
      default:
        console.log("how");
    }

    socketLedToggle(socket, red, green, blue);
  }

  function databaseTransaction(codeString) {
    if (dbRef.current) {
      setRecCodeString(codeString);
      // const uid = auth.currentUser.uid;
      completeTransaction(dbRef.current, codeString);
    }
  }

  document.addEventListener(
    "keydown",
    function (e) {
      if (
        e.key == 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
      }
    },
    false
  );

  return (
    <div className="h-screen overflow-clip">
      <Navbar />
      <FileHeader docID={projRef.key} tempName={"Untitled"} />
      <div className="flex justify-start">
        <div className="w-[70vw] flex">
          {/*Files Page*/}
          <div className="h-full w-[20vw]">
            <button
              className="m-1 p-1 mb-3 font-semibold text-center w-fit border border-1 border-black"
              onClick={() => {
                addFile();
              }}
            >
              New +
            </button>
            {/* TODO: Refactor this into its own component in ProjectsSection */}
            <div>
              {documentDataList.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "flex justify-between items-center border border-black " +
                      (selectedIndex === i ? "bg-gray-300" : "bg-white")
                    }
                    onClick={() => {
                      setSelectedIndex(i);
                      dbRef.current = documentRefListRef.current[i];
                      setSentCodeString(documentDataList[i].value);
                    }}
                  >
                    <div className={"p-1 pl-3 font-semibold "}>{item.name}</div>
                    {i !== 0 ? (
                      <Delete
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedIndex(0);
                          remove(documentRefListRef.current[i]);
                          dbRef.current = documentRefListRef.current[0];
                          setSentCodeString(documentDataList[0].value);
                          documentRefListRef.current.splice(i, 1);
                          var tempDataArray = [...documentDataList];
                          tempDataArray.splice(i, 1);
                          setDocumentDataList([...tempDataArray]);
                        }}
                      />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Code Editor */}
          <div className="h-full w-full">
            <div className="h-7 w-full text-base border-2 border-r-0 border-black flex justify-between">
              <div className="ml-2">Code Editor</div>
              <div
                onClick={() => {
                  databaseTransaction(recCodeString);
                }}
                className="mr-2"
              >
                Save
              </div>
            </div>
            <div className="h-[67vh] w-full align-top border-black border-0 flex">
              <div className="h-[67vh] w-full align-top border-black border-0">
                <CodeEditor
                  setChildData={(codeString) => {
                    databaseTransaction(codeString);
                  }}
                  CodeValue={sentCodeString}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Markdown */}
        <div className="h-[67vh] w-[30vw]">
          <div className="h-7 w-full text-base border-2 border-black pl-2">
            Tutorials
          </div>
          {/* <StorageRequests setUrl={setUrl} className="p-2"/> */}
          <div className="h-full w-full overflow-y-auto border-2 border-black border-y-0">
            <Markdown downloadUrl={url} />
          </div>
        </div>
      </div>

      {/* Terminal and buttons */}
      <div className="flex h-[18vh] w-full">
        {/* <div className="w-[90%] border-2 border-black p-[10px] h-full">
          <div className="h-full">
            <div
              className="bg-red-500 text-center m-2 h-1/4"
              onClick={() => {
                buttonEventSend("red");
              }}
            >
              Red
            </div>
            <div
              className="bg-green-500 text-center m-2 h-1/4"
              onClick={() => {
                buttonEventSend("green");
              }}
            >
              Green
            </div>
            <div
              className="bg-blue-500 text-center m-2 h-1/4"
              onClick={() => {
                buttonEventSend("blue");
              }}
            >
              Blue
            </div>
          </div>
        </div> */}
        {/* w-[10%] */}
        <div className="w-full border-2 border-black border-l-0 p-[10px] overflow-clip h-full">
          <input
            type="text"
            className="w-full"
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
            onClick={() => {
              pushPythonCode(socket, isConnected, recCodeString);
            }}
          >
            Run
          </div>
          <div
            className="bg-red-200 text-center m-2 rounded-full"
            onClick={() => {
              disconnect(socket, isConnected);
            }}
          >
            Stop
          </div>
        </div>
      </div>
      {/* Courses */}
      <div></div>
    </div>
  );
};

export default Editor;
