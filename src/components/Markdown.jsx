import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import testmd from '../test.md' // For testing purposes, simply change the fetch statement to import the test file instead

const Markdown = (downloadUrl) => {
    const [markdown, setMarkdown] = useState("")

    function fetchFromDownloadURL(url) {
        console.log(url)
        fetch(url, {
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

    return (
        <div className="m-2">
            { fetchFromDownloadURL(downloadUrl.downloadUrl) }
            <ReactMarkdown className="prose" children={markdown}/>
        </div>
    )
}

export default Markdown