import React from 'react'

const Markdown = () => {

    function fetchFromDownloadURL(url) {
        console.log(url)
        fetch(url, {
            method: 'GET',
            // headers: {
            //     "Access-Control-Allow-Origin": "*"
            // },
            // mode: "no-cors"
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
            new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `FileName.pdf`,
            );
    
            // Append to html link element page
            document.body.appendChild(link);
    
            // Start download
            // link.click();
    
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        })
        .catch((error) => {
            console.error(error)
        });
    }

    return (
        <div>
            { console.log("here") }
            { fetchFromDownloadURL('https://firebasestorage.googleapis.com/v0/b/skyrobotics-fc578.appspot.com/o/tutorials%2Ftutorial_3.md?alt=media&token=10dd258a-fd73-4d81-9801-cbbdd6408445') }
            Test
        </div>
    )
}

export default Markdown