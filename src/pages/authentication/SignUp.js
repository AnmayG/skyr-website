import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/general/Navbar";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const SignUp = () => {
  const [image, setImage] = useState("./penguin1.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("")
  const navigate = useNavigate();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    signInSuccessUrl: "/dashboard",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user.email !== null) {
          console.log(user.email);
          navigate("/confirm");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    const texts = document.querySelectorAll(
      ".firebaseui-idp-text-long, .firebaseui-title"
    );
    for (let i = 0; i < texts.length; ++i) {
      const item = texts.item(i);
      if (item?.textContent?.includes("Sign in")) {
        item.textContent = item.textContent.replace("Sign in", "Sign up");
      }
    }
    return () => {};
  });

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-col flex-grow items-center justify-start bg-gray-200">
        <img alt="" src={image} height={400} width={400} />
        <div className="min-w-[500px] border-2 border-gray-400 border-opacity-30 bg-white shadow">
          <p className="text-2xl font-bold text-center mt-8 mb-2">Sign Up</p>
          <div className="m-0">
            <StyledFirebaseAuth
              className="w-full"
              uiConfig={uiConfig}
              firebaseAuth={auth}
            />
          </div>
          <div className="flex w-full mt-3 items-center">
            <div className="h-[1.5px] bg-gray-200 w-[40%] ml-2"></div>
            <p className="text-2xl text-center font-bold w-[20%] text-gray-400">
              OR
            </p>
            <div className="h-[1.5px] bg-gray-200 w-[40%] mr-2"></div>
          </div>
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
              onFocus={() => {
                setImage("./penguin1.png");
              }}
            />
            <label className="text-sm text-left w-full mt-3 mb-0 text-gray-500">
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
              onFocus={() => {
                setImage("./penguin2.png");
              }}
            />
            <button
              className="w-3/5 text-center justify-center items-center bg-blue-400 rounded-3xl px-4 py-2 mb-8"
              onClick={createUser}
            >
              <span className="text-xl font-bold text-center text-white">
                Submit
              </span>
            </button>
          </div>
        </div>
        <p className="text-base text-center mt-4 italic">
          Already have an account? Log in{" "}
          <Link className="italic text-blue-700" to="/login">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
