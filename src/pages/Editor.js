import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CodeEditor from "../components/CodeEditor"
import Markdown from '../components/Markdown'
import StorageRequests from '../components/StorageRequests'

const Editor = () => {
    const [urls, setUrls] = useState([])
  return (
      <div className=''>
        <Navbar />
        <div className="w-2/3 inline-block align-top">
            <CodeEditor />
        </div>
        <div className='h-full w-1/3 inline-block'>
            <div className='h-7 text-base w-full border-2 border-l-0 border-black'>
                Tutorials (below is temporary update stuff)
            </div>
            <StorageRequests setUrls={setUrls}/>
            <div className='h-[27.25rem] overflow-auto border-2 border-black border-l-0'>
                <Markdown downloadUrl={"https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftest.md?alt=media&token=9c4898ae-42e6-407d-a99b-e91ea9bc2e22"}/>
            </div>
        </div>
        <div className='w-[90%] border-2 border-black border-t-0 inline-block'>
            Here
        </div>
        <div className='w-[10%] border-2 border-black border-t-0 border-l-0 inline-block'>
            Here2
        </div>
      </div>

  )
}

/*
 While the beginning of the imperialist movement saw a wide prevalence of ideas like Poor Man's Burden that served to
 demonize imperialization, over time these attitudes shifted to become pro-imperialist, resulting in the induction of
 territories and states like Hawaii and Puerto Rico into the US.
 */

export default Editor