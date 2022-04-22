// This should have all of the socket functions
// Stuff like pushing code, running code, etc
function socketLedToggle(socket, red, green, blue) {
  socket.emit("led-toggle", {
    r: red,
    g: green,
    b: blue,
  });
}

const headerCode = `from lib import *\nfrom adafruit_servokit import ServoKit\nkit = ServoKit(channels=16)\n`;
// const headerCode = `from lib import *\nfrom adafruit_servokit import ServoKit\n`
function pushPythonCode(socket, isConnected, recCodeString) {
  if (!isConnected) alert("Server disconnected");

  socket.emit("python-push", {
    code: `${headerCode}${recCodeString}`,
  });
}

function disconnect(socket, isConnected) {
  if (!isConnected) alert("Server disconnected");

  socket.emit("python-kill", {
    command: "stop",
  });
}

export { socketLedToggle, pushPythonCode, disconnect };
