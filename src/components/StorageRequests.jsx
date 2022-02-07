import { db, auth, storage } from '../firebase'
import { useEffect, useState } from 'react'
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

function StorageRequests() {

    const [downloadUrls, setDownloadUrls] = useState([]);

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

    function handleFetch() {
        console.log("Start fetch");
        const listRef = ref(storage, 'tutorials');
        listAll(listRef)
            .then((res) => {
                const tempURLs = []
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    getDownloadURL(itemRef)
                        .then(url => {
                            tempURLs.push({name: itemRef.name, url: url})
                        })
                        .catch(e => {
                            console.error(e)
                        })
                });
                console.log(tempURLs)
                setDownloadUrls(tempURLs)
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.error(error)
            });
    }

    useEffect(() => {
        handleFetch()
    }, [])

    return(
        <div className="storage-requests">
            <label className="">
                <input
                type="file"
                onChange={handleUpload}
                />
            </label>
            {downloadUrls.map(item => {
                return (
                    <div key={item.url}>
                        <p>Name: {item.name} URL: {item.url}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default StorageRequests
