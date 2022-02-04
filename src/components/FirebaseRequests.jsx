import logo from '../logo.svg';
import '../App.css';
import { db, auth } from "../firebase"
import { ref, set } from "firebase/database"
import { useEffect, useState } from 'react';

function FirebaseRequests() {
  const [value, setValue] = useState(""); // Store the text field value
  const getValue = (event) => {
    setValue(event.target.value)
  };
  const [values, setValues] = useState([]);

  const [documents, setDocuments] = useState([]); // Create a list of currently cached documents

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
  };

  function textSnapshot() {
    db.collection("values").onSnapshot((snap) => {
      let arr = [];
      snap.docs.forEach((doc) => {
        var docData = {id: doc.id, value: doc.data() }
          console.log(docData)
          arr.push({id: doc.id, value: doc.data() })
      })
      setDocuments(arr)
      console.log(arr[0].id, arr[1].id)
    })
  }

  async function getAllDocuments() {
    const events = await db.collection('values')
    events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
            tempDoc.push({ id: doc.id, ...doc.data() })
        })
        setValues(tempDoc)
      })
  }

  function buttonClicked() {
    addValue()
    getAllDocuments()
  }


  useEffect(() => {
    textSnapshot()
  }, []);

  return (
    <div className="App">
      <input onBlur={getValue} type='text' />
      <button type='button' onClick={buttonClicked}>Add</button>
      <div>
        <span>Values</span>
        {values.map(item => {
          return (<div>
              <p>Document: {item.id} Value: {item.value}</p>
              <br></br>
            </div>);
        })}
      </div>
    </div>
  );
}

export default FirebaseRequests;
