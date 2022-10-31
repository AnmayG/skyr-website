import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Markdown from "./Markdown";
import { createTheme, ThemeProvider } from "@mui/material";
import { a11yDark, CopyBlock } from "react-code-blocks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabView() {
  const [value, setValue] = useState(0);

  // Markdown state
  const [url] = useState(
    "https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftutorial-1.md?alt=media&token=24b05721-9dd7-4204-9f25-1739f37b2709"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="h-[70vh] justify-center">
      <div className="border border-x-0 border-t-0 border-b-1 bg-slate-700 text-white">
        <Tabs
          className=""
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ height: "32px", color: "white" }}
        >
          <Tab label="Tutorial" sx={{ height: "32px", color: "white" }} />
          <Tab label="Docs" sx={{ height: "32px", color: "white" }} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className="h-[69vh] w-full overflow-y-auto border-gray-300 border-y-0 p-[-4px]">
          <Markdown downloadUrl={url} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="h-[68vh] m-2 overflow-y-auto">
          <p className="">
            This is the documentation for SkyRobotics, providing a reference for
            every function SkyRobotics implements.
          </p>
          <br />
          <p className="">
            Scroll through the full documentation below or use <b>Ctrl/Cmd-F</b>{" "}
            to search for a specific function.
          </p>
          <br />
          <p className="font-bold text-lg">Move</p>
          <p>
            This function moves the robot by powering both motors with the same
            power.
            <br />
            <b>Parameters:</b>
            <p>
              <b>kit: </b>The default motor kit setup. Do not change this
              variable.
            </p>
            <p>
              <b>delay: </b>The time for which the robot will travel.
            </p>
            <p>
              <b>power: </b>The power with which the robot will move; must be
              between -1 and 1.
            </p>
          </p>
          <br />
          <CopyBlock
            text={`move(kit=kit, delay=1, power=1)`}
            language={"python"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={a11yDark}
            codeBlock
          />
          <br />
          <br />
          <p className="font-bold text-lg">Turn</p>
          <p>
            This function turns the robot by powering one motor with a certain
            amount of power.
            <br />
            <b>Parameters:</b>
            <p>
              <b>kit: </b>The default motor kit setup. Do not change this
              variable.
            </p>
            <p>
              <b>delay: </b>The time for which the robot will turn.
            </p>
            <p>
              <b>motor: </b>The motor that will be powered during the turn.
              Remember that the robot will head in the <i>opposite</i> direction
              from where the motor is.
            </p>
            <p>
              <b>power: </b>The power with which the robot will turn; must be
              between -1 and 1.
            </p>
          </p>
          <br />
          <CopyBlock
            text={`turn(kit=kit, delay=1, motor=1, power=1)`}
            language={"python"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={a11yDark}
            codeBlock
          />
          <br />
          <br />
          <p className="font-bold text-lg">Spin Turn</p>
          <p>
            This function spins the robot by powering both motors with the same
            power in opposite directions.
            <br />
            <b>Parameters:</b>
            <p>
              <b>kit: </b>The default motor kit setup. Do not change this
              variable.
            </p>
            <p>
              <b>delay: </b>The time for which the robot will spin.
            </p>
            <p>
              <b>power: </b>The power with which the robot will move; must be
              between -1 and 1.
            </p>
          </p>
          <br />
          <CopyBlock
            text={`spin_turn(kit=kit, delay=1, power=1)`}
            language={"python"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={a11yDark}
            codeBlock
          />
          <br />
          <br />
        </div>
      </TabPanel>
    </div>
  );
}
