import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Markdown from "./Markdown";

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

export default function BasicTabs() {
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
          sx={{ height: "32px" }}
        >
          <Tab label="Tutorial" sx={{ height: "32px" }} />
          <Tab label="Docs" sx={{ height: "32px" }} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className="h-[70vh] w-full overflow-y-auto border-gray-300 border-y-0 p-[-4px]">
          <Markdown downloadUrl={url} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
