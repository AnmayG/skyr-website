// This should have all of the socket functions
// Stuff like pushing code, running code, etc
function socketLedToggle(socket, red, green, blue) {
    socket.emit("led-toggle", {
        r: red,
        g: green,
        b: blue,
    });
}

function pushPythonCode(socket, isConnected, recCodeString) {
    if (!isConnected) alert("Server disconnected");

        socket.emit("python-push", {
            code: `from lib import *\n ${recCodeString}`,
    });
}

function disconnect(socket, isConnected) {
    if (!isConnected) alert("Server disconnected");

    socket.emit("python-kill", {
        command: "stop",
    });
}