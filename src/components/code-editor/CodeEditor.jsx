import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useEffect, useState } from "react";

export default function CodeEditor(props) {
  const [editorTheme, setEditorTheme] = useState("");
  const [codeValue, setCodeValue] = useState();

  useEffect(() => {
    setCodeValue(props.CodeValue);
    // props.setChildData("from lib import *\n" + codeValue);
    return () => {};
  }, []);

  useEffect(() => {
    setCodeValue(props.CodeValue);
    return () => {};
  }, [props.CodeValue]);

  return (
    <div className="">
      <CodeMirror
        value={codeValue}
        autoFocus="true"
        height="70vh"
        extensions={[python()]}
        onChange={(value, viewUpdate) => {
          setCodeValue(value.trim());
          props.setChildData(value.trim());
        }}
      />
    </div>
  );
}
