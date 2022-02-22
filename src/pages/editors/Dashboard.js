import React from 'react'
import Navbar from '../../components/Navbar'
import { addDocument } from "../../components/FirestoreInterface"
import { auth, db } from "../../firebase"

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='ml-20'>
        This is the dashboard! Your files will show up here.
        <div
          className='outline outline-1 w-fit'
          onClick={() => {
            addDocument(auth.currentUser.uid, { name: "hello" })
          }}>
          Add user
        </div>
      </div>
    </div>
  )
}

export default Dashboard