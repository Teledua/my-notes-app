import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

function Signin (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  function linkto() {
    navigate("/");
  }

// this is handling the form event of checking if the email exists in the database
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  // so it will await a promise to see if the email exists
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);

    const user = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
    };
// if it exists it should navigate you to the note app

    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
    navigate("/Home");
    // if it does it brings up an error
// this basicaliy displays the alert according to the error
  } catch (error) {
    console.log(error);
    setLoading(false);
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/invalid-login-credentials') {
            alert('Invalid Login details');
      } else {
            alert(errorMessage);
      }
      console.log(error);
      }
  
}

  return (
    <div className='grid h-screen w-screen place-content-center'>
      <div className='sm:flex items-center shadow-lg shadow-emerald-500/50 '>
        <div className='grid place-content-center w-full h-full bg-emerald-400 p-32 text-white font-bold text-2xl'>
          <p>Welcome</p>
          <p>To Teledua's Note App</p>
        </div>
        <div className='sm:grid gap-10 bg-white px-10 py-20 '>
          <p className='text-2xl font-bold'>LOG IN</p>
          <form className='grid gap-5' onSubmit={handleLogin}>
            <div>
              <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border-b-4 bg-transparent outline-none' /><br />
              <input type="password" value={password}   onChange={(e) => setPassword(e.target.value)} id="" placeholder='Password' className='border-b-4  bg-transparent mt-4 outline-none ' />
            </div>
            <div>
              <button className='rounded-full text-white bg-emerald-400 py-4 px-10' type="submit">{loading ? "Loading" : "Sign In"}</button>
            </div>
            <small >Don't have an account? <span onClick={linkto} className='text-sky-300 underline'>Sign up</span></small>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
