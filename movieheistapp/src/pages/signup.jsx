import React, { useState } from "react";
import loginbg from "../assets/loginbg.jpg";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../global/Firebase";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import axios from "axios"; 
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
import AppHeader from "../components/AppHeader";
import { SiSuperuser } from "react-icons/si";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  //   console.log(values);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previousVal) => ({
      ...previousVal,
      [name]: value,
    }));
  };

  const guestUser = () =>{
    navigate("/");
  }

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(firebaseAuth, provider);
  //     navigate("/preference");
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error.message);
  //   }
  // };
  
  const handleSignUpClick = () => {
    try {
      const { email, password } = values;
      console.log(email,password)
      navigate("/preference", {state : {email: email, password: password}});
      } catch (error) {
        console.error("Error during signup:", error.message);
    }
    // onAuthStateChanged(firebaseAuth, (user) => { 
    //   if (user) navigate("/preference");
    // });
  };
  return (
    <div className=" w-full h-screen">
      <div>
        <img
          className="sm:block absolute w-full h-screen object-cover"
          src={loginbg}
          alt=""
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen" />
        <div className=" fixed w-full">
          <AppHeader login />
          <div className=" h-[520px] max-w-[500px] mx-auto bg-black/70 rounded-lg">
            <div className=" max-w-[330px] mx-auto py-14">
              <h1 className="flex font-sans text-3xl justify-start">Sign Up</h1>
              <form action="" className=" w-full flex flex-col py-4">
                <input
                  type="email"
                  name="email"
                  id=""
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <button
                  onClick={handleSignUpClick}
                  type="button"
                  className=" bg-red-700 py-3 my-3 font-sans"
                >
                  Sign Up
                </button>
                {error && <p className=" text-center text-red-500">{error}</p>}
                <div className="text-white justify-between items-center flex">
                  <p>
                    <input type="checkbox" className="mr-2" /> Remember me
                  </p>

                  <Link to="/help">Help?</Link>
                </div>
                <p className=" my-3">
                  <span className=" mr-2 text-sm text-sans-bold text-gray-600">
                    Already Have Account to Movie Heist?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
                <button
                  type="button"
                  onClick={guestUser}
                  className=" flex justify-center items-center bg-red-700 py-3 my-6 font-sans"
                >
                  <SiSuperuser className=" mr-2"></SiSuperuser>Try as Guest
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

