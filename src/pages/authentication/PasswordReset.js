import React, { useState } from 'react'
import Navbar from '../../components/general/Navbar'
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth"

const PasswordReset = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="flex flex-col h-screen w-screen">
        <Navbar />
        <div className='flex items-center justify-center bg-gray-200 h-screen w-screen'>
            <div className='flex flex-col bg-white w-1/4 p-8'>
                <label className="text-sm text-left w-full mb-0 text-gray-500">
                Email
                </label>
                <input
                className="shadow appearance-none border rounded w-full p-3 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline text-lg"
                type="text"
                placeholder="Email Address"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                />
                <button className='text-center bg-blue-200 m-8' onClick={() => {
                    sendPasswordResetEmail(auth, email)
                        .then(() => {
                            console.log("Email sent!")
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                }}>
                    Send Password Reset Email
                </button>
            </div>
        </div>
    </div>
  )
}

export default PasswordReset