import React from "react";

function TerminalComponent() {
  return (
    <div className="m-0 p-0 h-full">
      <div id="terminal-container" style="margin: 0; padding: 0; height: 100%">
        <script type="module" src="src/index.js"></script>
      </div>
    </div>
  );
}

export default TerminalComponent;
