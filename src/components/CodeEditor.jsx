import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useEffect, useState } from "react";

export default function CodeEditor(props) {
  const [editorTheme, setEditorTheme] = useState("");
  const [codeValue, setCodeValue] = useState();

  useEffect(() => {
    setCodeValue(props.CodeValue)
    // props.setChildData("from lib import *\n" + codeValue);
    return () => {};
  }, []);

  useEffect(() => {
    setCodeValue(props.CodeValue)
    return () => {}
  }, [props.CodeValue])
  

  return (
    <div className="">
      <CodeMirror
        value={codeValue}
        autoFocus="true"
        height="30.9rem"
        className="h-[31rem] border-2 border-black border-t-0"
        extensions={[python()]}
        onChange={(value, viewUpdate) => {
          setCodeValue(value.trim());
          props.setChildData(value.trim());
        }}
      />
    </div>
  );
}
