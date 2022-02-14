import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/stream-parser';
import { python } from '@codemirror/lang-python';
import { useState } from 'react';

const tempCode = `print("Hello World!")`;

export default function CodeEditor() {
    const [editorTheme, setEditorTheme] = useState("");

    return (
        <div className="border-2">
            {/* Document information*/}
            <div className='h-7 text-base border-2 border-black'>
                work
            </div>
            <CodeMirror
                value={tempCode}
                autoFocus="true"
                height='30.9rem'
                
                className='h-[31rem] border-2 border-black border-t-0'
                extensions={[python()]}
                onChange={(value, viewUpdate) => {
                    // console.log('value:', value);
                }}
            />
        </div>
        
    );
}