import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

function FirebaseRequests() {
  const [value, setValue] = useState(""); // Store the text field value
  const getValue = (event) => {
    setValue(event.target.value);
  };
  const [values, setValues] = useState([]);
  // Create a list of currently cached documents
  const [documents, setDocuments] = useState([]);
  function addValue() {
    db.collection("values")
      .doc()
      .set({
        // Reads the value so it works
        value: value,
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing value: ", error);
      });
  }

  function textSnapshot() {
    db.collection("values").onSnapshot((snap) => {
      let arr = [];
      snap.docs.forEach((doc) => {
        arr.push({ id: doc.id, value: doc.data() });
      });
      setDocuments(arr);
    });
  }

  async function getAllDocuments() {
    const events = await db.collection("values");
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setValues(tempDoc);
    });
  }

  function buttonClicked() {
    addValue();
    getAllDocuments();
  }

  useEffect(() => {
    textSnapshot();
    getAllDocuments();
  }, []);

  return (
    <div className="storage-requests">
      <input className="outline outline-1 mr-2" onBlur={getValue} type="text" />
      <button
        className="outline outline-1"
        type="button"
        onClick={buttonClicked}
      >
        Add
      </button>
      <div>
        <span>Values</span>
        {values.map((item) => {
          return (
            <div key={item.id}>
              <p>
                Document: {item.id} Value: {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FirebaseRequests;
