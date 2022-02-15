import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import testmd from '../test.md' // For testing purposes, simply change the fetch statement to import the test file instead

const Markdown = (props) => {
    const [markdown, setMarkdown] = useState("")

    async function fetchFromDownloadURL(url) {
        await fetch(url, {
            method: 'GET',
            // headers: {
            //     "Access-Control-Allow-Origin": "*"
            // },
            // mode: "no-cors"
        })
        .then((response) => response.text())
        .then((text) => {
            setMarkdown(text)
        })
        .catch((error) => {
            console.error(error)
        });
    }

    useEffect(() => {
        if(typeof props.downloadUrl !== "undefined") {
            fetchFromDownloadURL(props.downloadUrl)
        }
        return () => {
            setMarkdown("")
        }
    }, [])
    

    return (
        <div className="m-2">
            <ReactMarkdown className="prose" children={markdown}/>
        </div>
    )
}

export default Markdown