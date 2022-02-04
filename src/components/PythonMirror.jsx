import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

export default function PythonMirror() {
  return (
    <CodeMirror
      value="print('hello world!');"
      height="200px"
      extensions={[python()]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
  );
}
