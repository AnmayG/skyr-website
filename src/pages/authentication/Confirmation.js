import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { auth } from '../../firebase'
import { sendEmailVerification } from "firebase/auth"
import { Link } from 'react-router-dom'


const Confirmation = () => {

    useEffect(() => {
      return () => {
        sendUserEmail()
      }
    }, [])
    
    function sendUserEmail() {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log("Email sent!")
        })
        .catch((error) => {
            console.log(error.message);
        })
    }

    if(auth.currentUser == null) {
        return(
            <div className='m-8'>
                No email to confirm user with.
                <div>
                    <Link to="/">Return home</Link>
                </div>
            </div>
        )
    } else {
        console.log(auth.currentUser.email)
        return (
            <div className="flex flex-col h-screen w-screen">
                <Navbar />
                <div className='flex items-center justify-center bg-gray-200 h-screen w-screen'>
                    <div className='flex flex-col bg-white w-1/4 p-8'>
                        {/* <label className="text-sm text-left w-full mb-0 text-gray-500">
                        Email
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full p-3 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline text-lg"
                        type="text"
                        placeholder="Email Address"
                        onChange={(e) => {
                            console.log(email)
                            setEmail(e.target.value);
                        }}
                        /> */}
                        <button className='text-center bg-blue-200 m-8' onClick={() => {
                            sendUserEmail()
                        }}>
                            Resend User Verification Email
                        </button>
                    </div>
                </div>
            </div>
          )
    }
}

export default Confirmation