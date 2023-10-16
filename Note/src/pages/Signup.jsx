import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function link() {
        navigate("/signin");
    }
// this upadates the database with your new details

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            // it checks to see if your sign up details already exists

            const user = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
            };
// if it doesnt it navigates you to the home page
// if it does it brings up an error
// this basicaliy displays the alert according to the error
            localStorage.setItem("user", JSON.stringify(user));
            setLoading(false);
            navigate("/Home");
        } catch (error) {
            console.log(error);
            setLoading(false);
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else if(errorCode == 'auth/email-already-in-use'){
            alert('Email is already in use ')
        } else {
            alert(errorMessage);
        }
        console.log(error);
        }
    };
  return (
      <div className='grid h-screen w-screen place-content-center'>
          <div className='sm:flex items-center shadow-lg shadow-emerald-500/50 '>
              <div className='grid place-content-center w-full h-full bg-emerald-400 p-32 text-white font-bold text-2xl'>
                  <p>Join Us on</p>
                  <p>Teledua's Note App</p>
              </div>
              <div className='sm:grid gap-10 bg-white px-10 py-20 '>
                  <p className='text-2xl font-bold'>SIGN UP</p>
                  <form className='grid gap-5' onSubmit={handleSignUp}>
                      <div>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border-b-4 bg-transparent outline-none required:' /><br />
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="" placeholder='Password' className='border-b-4  bg-transparent mt-4 outline-none  required:' />
                      </div>
                      <div>
                          <button className='rounded-full text-white bg-emerald-400 py-4 px-10' type="submit">{loading ? "Loading" : "Sign Up"}</button>
                      </div>
                      <small >Already have an account? <span className="text-sky-300 underline" onClick={link}>Sign in</span></small>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Signup
