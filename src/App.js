import logo from './logo.svg';
import './App.css';
import {db, auth} from "./firebase"
import {ref, set} from "firebase/database"
import { useEffect, useState } from 'react';

function App() {
  const [value, setValue] = useState(""); // Store the text field value
  const getValue = (event) => {
    setValue(event.target.value)
  };

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

  useEffect(() => {
    async function get_data() {
      await db.collection("values")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        // Get the documents within the listed queries
        console.log(querySnapshot)
        querySnapshot.docs.map((doc) => {
          var docData = {id: doc.id, value: doc.data() }
          console.log(docData)
          arr.push({id: doc.id, value: doc.data() })
          setDocuments(oldArray => [...oldArray, docData])
        })
        // Set the documents accordingly
        setDocuments(arr)
        console.log(arr[0].id, arr[1].id)
      })
      .catch(function(error) {
        console.error("Error receiving value: ", error);
      });
    }
    
    get_data()
  }, [db]);



  return (
    <div className="App">
      <span>firebase</span>
      <input onBlur={getValue} type='text' />
      <button type='button' onClick={addValue}>Add</button>
      <div>
        <span>Values</span>
        {documents.map((document) => {
          <div key={document.id}>
            <p>Here</p>
            <div>
              Document: {document.id} Value: {document.value.value}
            </div>
          </div>
        })}
      </div>

      <span>cloud storage</span>
      
    </div>
  );
}

export default App;
