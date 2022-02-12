import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/stream-parser';
import { python } from '@codemirror/lang-python';
import { useState } from 'react';

const tempCode = `print("Hello World!")`;

export default function CodeEditor() {
    const [editorTheme, setEditorTheme] = useState("");

    return (
        <div>
            {/* Document information*/}
            <div className='h-7 text-base'>
                work
            </div>
            <CodeMirror
                value={tempCode}
                autoFocus="true"
                height='31rem'
                className='h-100% outline outline-1 outline-black'
                extensions={[python()]}
                onChange={(value, viewUpdate) => {
                    console.log('value:', value);
                }}
            />
        </div>
        
    );
}