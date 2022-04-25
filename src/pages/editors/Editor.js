import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import CodeEditor from "../../components/code-editor/CodeEditor";
import Markdown from "../../components/code-editor/Markdown";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { rdb } from "../../firebase";
import { push, ref, onValue, remove, update, get } from "firebase/database";
import { completeTransaction } from "../../interfaces/RealtimeDBInterface";
import { pushPythonCode, disconnect } from "../../interfaces/SocketInterface";
import FileHeader from "../../components/code-editor/FileHeader";
import {
  Cancel,
  CheckCircle,
  Delete,
  DriveFileRenameOutline,
  Send,
  SendOutlined,
  Settings,
  StopCircle,
} from "@mui/icons-material";
import Split from "react-split";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import RenameModal from "../../components/code-editor/modals/RenameModal";
import ConnectionSettingsModal from "../../components/code-editor/modals/ConnectionSettingsModal";
import useModalState from "../../components/code-editor/modals/useModalState";
import { Button } from "@mui/material";
const sampleCode = `# move forward at full power for 1 second
move(kit=kit, delay=1, power=1)
# turn at full power for 1 second
turn(kit=kit, delay=1, motor=1, power=1)
# spin at full power for one second
spin_turn(kit, delay=1, power=1)
`;
const headingCodeWithRobot = `from lib import *\nfrom adafruit_servokit import ServoKit\nkit = ServoKit(channels=16)\n`;
const headingCodeWithoutRobot = `from lib import *\nfrom adafruit_servokit import ServoKit\n`;

// TODO: Refactor into multiple components; currently all in one in order to minimize prop drilling
const Editor = (props) => {
  // URL Params
  const [params] = useSearchParams();
  const projId = params.get("projid");
  const navigate = useNavigate();

  // Project References
  const projRef = ref(rdb, `/projects/${projId}`);
  const dbRef = useRef(null);
  const documentRefListRef = useRef([]);
  const [documentDataList, setDocumentDataList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Modal state
  const [open, handleOpen, handleClose] = useModalState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [modalName, setModalName] = useState(null);

  // Settings Modal State
  const [settingsOpen, handleSettingsOpen, handleSettingsClose] =
    useModalState(false);

  // Markdown state
  const [url] = useState(
    "https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftutorial-1.md?alt=media&token=24b05721-9dd7-4204-9f25-1739f37b2709"
  );

  // Connection state
  const [isConnected, setConnected] = useState(false);
  const serverType = "http";
  const [ipAddress, setIpAddress] = useState(
    serverType + "://raspberrypi.local:9000"
  );
  const [socket, setSocket] = useState(null);
  const [useHeading, setUseHeading] = useState(headingCodeWithRobot);

  // CodeMirror state
  const [sentCodeString, setSentCodeString] = useState(``);
  const [recCodeString, setRecCodeString] = useState("");

  // Split Pane State
  const [codeTutorialSizes, setCodeTutorialSizes] = useState(
    localStorage.getItem("editor-tutorial-split-sizes")
      ? JSON.parse(localStorage.getItem("editor-tutorial-split-sizes"))
      : [70, 30]
  );

  const [fileEditorSizes, setFileEditorSizes] = useState(
    localStorage.getItem("file-editor-split-sizes")
      ? JSON.parse(localStorage.getItem("file-editor-split-sizes"))
      : [10, 90]
  );

  const [terminalRunSizes, setTerminalRunSizes] = useState(
    localStorage.getItem("terminal-run-split-sizes")
      ? JSON.parse(localStorage.getItem("terminal-run-split-sizes"))
      : [90, 10]
  );

  // XTerm Vars
  const xtermRef = useRef(null);
  const fitAddonObject = new FitAddon();
  useEffect(() => {
    fitAddonObject.fit();
  }, []);

  // Websocket Connection
  useEffect(() => {
    const newSocket = io(ipAddress, {
      transports: ["websocket"],
      secure: "true",
    });

    newSocket.on("connect", () => {
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
    });

    // Write initial output
    xtermRef.current.terminal.writeln("Connect to robot to see output");
    newSocket.on("program-output", (data) => {
      // print program logs
      xtermRef.current.terminal.writeln(data.value);
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
          tempRefArray.push(ref(rdb, `/projects/${projId}/${document}`));
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

  // File Management
  function addFile() {
    var newFileRef = push(projRef, { name: "Untitled", value: sampleCode });
    documentRefListRef.current.push(newFileRef);
    setDocumentDataList([
      ...documentDataList,
      { name: "Untitled", value: sampleCode },
    ]);
    dbRef.current = newFileRef;
    setSelectedIndex(documentRefListRef.current.length - 2);
    const data = sampleCode;
    setSentCodeString(data);
  }

  function databaseTransaction(codeString) {
    if (dbRef.current) {
      setRecCodeString(codeString);
      // const uid = auth.currentUser.uid;
      completeTransaction(dbRef.current, codeString);
    }
  }

  // override ctrl-s so it doesn't save
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

  function updateName(newName) {
    update(documentRefListRef.current[modalIndex], {
      name: newName,
    });
  }

  return (
    <div className="h-screen">
      <Navbar />
      <Split
        sizes={fileEditorSizes}
        minSize={[0, 800]}
        snapOffset={[75, 30]}
        className="split flex justify-start"
        onDragEnd={(newSizes) => {
          //          alert(fileSizes, JSON.stringify(newSizes));
          localStorage.setItem(
            "file-editor-split-sizes",
            JSON.stringify(newSizes)
          );
          setFileEditorSizes(newSizes);
        }}
      >
        {/*Files Page*/}
        <div className="h-full w-full border-y-0 border border-black overflow-auto">
          <button
            className="m-1 p-1 mb-2 font-semibold text-center w-fit border border-1 border-black overflow-hidden sticky"
            onClick={() => {
              addFile();
            }}
          >
            New +
          </button>
          {/* TODO: Refactor this into its own component in ProjectsSection */}
          <div
            className="h-[87vh] overflow-auto"
            style={{
              direction: "rtl",
            }}
          >
            {documentDataList.map((item, i) => {
              return (
                <div
                  key={i}
                  className={
                    "flex justify-between items-center border border-black overflow-ellipsis " +
                    (selectedIndex === i ? "bg-gray-300" : "bg-white")
                  }
                  style={{ direction: "ltr" }}
                  onClick={() => {
                    setSelectedIndex(i);
                    dbRef.current = documentRefListRef.current[i];
                    setSentCodeString(documentDataList[i].value);
                  }}
                >
                  <p
                    className={
                      "w-full p-1 pl-3 truncate " +
                      (selectedIndex === i ? "font-semibold" : "")
                    }
                  >
                    {item.name}
                  </p>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setModalIndex(i);
                      setModalName(item.name);
                      handleOpen();
                    }}
                  >
                    <DriveFileRenameOutline />
                  </button>
                  {i !== 0 ? (
                    <button
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
                    >
                      <Delete />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
            <RenameModal
              modalOpen={open}
              handleClose={handleClose}
              updateName={updateName}
              placeholderName={modalName}
            />
          </div>
        </div>
        <div>
          <Split
            className="split flex justify-start"
            minSize={[400, 0]}
            sizes={codeTutorialSizes}
            snapOffset={[30, 30]}
            onDragEnd={(newSizes) => {
              //          alert(fileSizes, JSON.stringify(newSizes));
              localStorage.setItem(
                "editor-tutorial-split-sizes",
                JSON.stringify(newSizes)
              );
              setCodeTutorialSizes(newSizes);
            }}
          >
            <div>
              <FileHeader docID={projRef.key} tempName={"Untitled"} />
              <div className="w-full flex">
                {/* Code Editor */}
                <div className="h-full w-full">
                  {/* <div className="h-7 w-full text-base border-2 border-r-0 border-black flex justify-between">
              <div className="ml-2">Code Editor</div>
              <div
                onClick={() => {
                  databaseTransaction(recCodeString);
                }}
                className="mr-2"
              >
                Save
              </div>
            </div> */}
                  <div className="h-[70vh] w-full align-top border-gray-300 border-0 flex">
                    <div className="h-[70vh] w-full align-top border-gray-300 border-0">
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
            </div>

            {/* Markdown */}
            <div className="h-[70vh] w-[30vw]">
              <div className="flex flex-col h-[5vh] w-full justify-center bg-slate-700 text-white">
                <div className="mx-2 text-lg">Tutorials</div>
              </div>
              {/* <StorageRequests setUrl={setUrl} className="p-2"/> */}
              <div className="h-full w-full overflow-y-auto border-4 border-gray-300 border-y-0">
                <Markdown downloadUrl={url} />
              </div>
            </div>
          </Split>

          {/* Terminal and buttons */}
          <Split
            sizes={terminalRunSizes}
            minSize={[720, 220]}
            className="split flex h-[18vh] w-full border-8 border-gray-300 border-x-0 border-b-0"
            onDragEnd={(newSizes) => {
              localStorage.setItem(
                "terminal-run-split-sizes",
                JSON.stringify(newSizes)
              );
              setTerminalRunSizes(newSizes);
            }}
          >
            <div className="w-full bg-slate-700 h-full">
              <XTerm
                className="p-2 h-full overflow-scroll no-scrollbar"
                ref={xtermRef}
                options={{ theme: { background: "#334155" }, convertEol: true }}
                addons={[fitAddonObject]}
              />
            </div>
            {/* w-[10%] */}
            <div className="w-full h-full p-2">
              {/* <input
                type="text"
                className="w-full"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setIpAddress(serverType + "://" + e.target.value + ":9000");
                  }
                }}
                placeholder={ipAddress}
              /> */}
              <div className="flex items-center my-1 overflow-y-auto justify-between">
                <div className="flex items-center px-1">
                  <div className="text-md flex items-center justify-center">
                    <p>Connected:</p>
                  </div>
                  {isConnected ? (
                    <CheckCircle className="ml-1" style={{ color: "green" }} />
                  ) : (
                    <Cancel className="ml-1" style={{ color: "darkred" }} />
                  )}
                </div>
                <Settings onClick={handleSettingsOpen} />
                <ConnectionSettingsModal
                  modalOpen={settingsOpen}
                  handleClose={handleSettingsClose}
                  updateConnection={setIpAddress}
                  currentConnection={ipAddress}
                />
              </div>
              <div
                className="w-full my-1 bg-red-600 py-1 rounded-sm shadow-md flex items-center justify-center text-white font-semibold"
                onClick={() => {
                  disconnect(socket, isConnected);
                  xtermRef.current.terminal.clear();
                  xtermRef.current.terminal.writeln("Script stopped");
                  // pushPythonCode(socket, isConnected, recCodeString);
                }}
              >
                <p className="text-md mr-1 p-1">STOP</p>
                <div className="">
                  <StopCircle className="h-[1vh]" fontSize="15" />
                </div>
              </div>
              <div className="flex w-full">
                <div
                  className="w-full bg-blue-600 py-1 rounded-sm shadow-md flex items-center justify-center text-white font-semibold"
                  onClick={() => {
                    pushPythonCode(
                      socket,
                      isConnected,
                      recCodeString,
                      useHeading
                    );
                    xtermRef.current.terminal.clear();
                  }}
                >
                  <p className="text-md mr-1 p-1">RUN FILE</p>
                  <div className="">
                    <SendOutlined />
                  </div>
                </div>
                <div
                  className="w-full ml-1 bg-green-600 py-1 rounded-sm shadow-md flex items-center justify-center text-white font-semibold"
                  onClick={() => {
                    get(projRef).then((snapshot) => {
                      if (snapshot.exists()) {
                        const projectDocumentValue = snapshot.val();
                        var sentString = "";
                        var i = 0;
                        var mainFile = "";
                        for (const fileKey in projectDocumentValue) {
                          const file = projectDocumentValue[fileKey];
                          const fileValue = file.value;
                          if (i === 0) {
                            mainFile = `${fileValue}\n`;
                          } else {
                            sentString = `${fileValue}\n${sentString}`;
                          }
                          i++;
                        }
                        sentString = `${sentString}${mainFile}`;
                        pushPythonCode(
                          socket,
                          isConnected,
                          sentString,
                          useHeading
                        );
                        xtermRef.current.terminal.clear();
                      }
                    });
                  }}
                >
                  <p className="text-md mr-1 p-1">RUN</p>
                  <div className="">
                    <Send />
                  </div>
                </div>
              </div>
              {/* <Button
                className="w-full"
                variant="outlined"
                color="error"
                endIcon={<StopCircle />}
                onClick={() => {
                  disconnect(socket, isConnected);
                }}
              >
                Stop
              </Button> */}
            </div>
          </Split>
        </div>
      </Split>
      {/* Courses */}
    </div>
  );
};

export default Editor;
