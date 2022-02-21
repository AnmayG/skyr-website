import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/signedIn",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  };

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             // User is signed in, see docs for a list of available properties
  //             // https://firebase.google.com/docs/reference/js/firebase.User
  //             const uid = user.uid;
  //             navigate("/")
  //             // ...
  //           } else {
  //             // User is signed out
  //             // ...
  //           }
  //       })

  //     return () => {

  //     }
  //   }, [])

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="min-w-[500px] border-2 border-gray-400 border-opacity-30 shadow">
          <p className="text-2xl font-bold text-center mt-8 mb-2">Sign Up</p>
          <p className="text-base text-center mb-2 italic">
            Already have an account? Log in{" "}
            <Link className="not-italic text-blue-700" to="/login">
              here
            </Link>
          </p>
          <div className="mx-8 flex flex-col items-center justify-center my-0">
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
            <label className="text-sm text-left w-full mt-4 mb-0 text-gray-500">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 mb-8 text-gray leading-tight focus:outline-none focus:shadow-outline text-lg"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  createUser();
                }
              }}
            />
            <button
              className="w-3/5 text-center justify-center items-center bg-blue-400 rounded-3xl px-4 py-2"
              onClick={createUser}
            >
              <span className="text-xl font-bold text-center text-white">
                Submit
              </span>
            </button>
          </div>
          <p className="text-2xl text-center font-bold m-3">OR</p>
          <StyledFirebaseAuth className='w-full' uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
