import React from 'react'
import Navbar from '../components/Navbar'
import CodeEditor from "../components/CodeEditor"

const Editor = () => {
  return (
      <div>
        <Navbar />
        <div className="w-4/5 inline-block align-top">
            <CodeEditor />
        </div>
        <div className='h-full w-1/5 inline-block'>
            <div className='h-7 w-full outline outline-1'>
                here3
            </div>
            <div>
                Here
            </div>
            <div>
                her2
            </div>
        </div>
      </div>

  )
}

export default Editor