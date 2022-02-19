import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/stream-parser';
import { python } from '@codemirror/lang-python';
import { useEffect, useState } from 'react';

const tempCode = `start()
set_outputs(26, 19, 13)
turn_off(26, 19, 13)

while True:
  blink(26, 0.2)
  blink(19, 0.2)
  blink(13, 0.2)`;

export default function CodeEditor(props) {
    const [editorTheme, setEditorTheme] = useState("");

    useEffect(() => {
      props.setChildData("from lib import *\n" + tempCode)
      return () => {}
    }, [])
    

    return (
        <div className="">
            {/* Document information*/}
            <div className='h-7 text-base border-2 border-black'>
                Code Header
            </div>
            <CodeMirror
                value={tempCode}
                autoFocus="true"
                height='30.9rem'
                className='h-[31rem] border-2 border-black border-t-0'
                extensions={[python()]}
                onChange={(value, viewUpdate) => {
                    props.setChildData("from lib import *\n" + value)
                }}
            />
        </div>
        
    );
}