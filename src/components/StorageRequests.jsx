import { db, auth, storage } from '../firebase'
import { useEffect, useState } from 'react'

function StorageRequests() {

    const { downloadUrls, setDownloadUrls } = useState([])

    function handleUpload(e) {
        console.log("Here")
        const file = e.target.files[0];
        if(file == null) return;
        const filePath = file.name;

        const uploadTask = storage
                            .ref(`/tutorials/${filePath}`)
                            .put(file)

        uploadTask.on("state_changed",
                      snapshot => {},
                      () => {},
                      () => {
                          uploadTask.snapshot.ref.getDownloadURL().then(url => {
                              console.log(url)
                          })
                      })
    }

    return(
        <div className="storage-requests">
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <input
                type="file"
                onChange={handleUpload}
                style={{ position: "absolute" }}
                />
            </label>
        </div>
    )
}

export default StorageRequests
