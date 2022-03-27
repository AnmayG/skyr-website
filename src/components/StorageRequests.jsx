import { db, auth, storage } from "../firebase";
import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

function StorageRequests(props) {
  const [downloadUrls, setDownloadUrls] = useState([]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file == null) return;
    const filePath = file.name;

    const uploadTask = storage.ref(`/tutorials/${filePath}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
        });
      }
    );
    handleFetch();
  }

  async function handleFetch() {
    console.log("Start fetch");
    const listRef = await ref(storage, "tutorials");
    await listAll(listRef)
      .then(async (res) => {
        const tempURLs = [];

        for (const itemRef of res.items) {
          await getDownloadURL(itemRef)
            .then((tempUrl) => {
              tempURLs.push({ name: itemRef.name, url: tempUrl });
            })
            .catch((e) => {
              console.error(e);
            });
        }
        setDownloadUrls(tempURLs);
        props.setChildData(tempURLs[0]);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="storage-requests">
      <label className="">
        <input type="file" onChange={handleUpload} />
      </label>
      <br></br>
      <button onClick={handleFetch}>Update Files</button>
      {downloadUrls.map((item) => {
        return (
          <div key={item.url}>
            <p>Name: {item.name}</p>
            <p>URL: {item.url}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StorageRequests;
