import React from 'react'
import { useState } from 'react';

const Signout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    setLoading(true);
  }
  return (
    <>
      <div className='grid h-screen w-screen place-content-center'>
        <div className='sm:flex items-center shadow-lg shadow-emerald-500/50 '>
          <div className='grid place-content-center w-full h-full bg-emerald-400 p-32 text-white font-bold text-2xl'>
            <p>Goodbye</p>
            <p>Come back soon</p>
          </div>
          <div className='sm:grid gap-10 bg-white px-10 py-20 '>
            <p className='text-2xl font-bold'>LOG OUT</p>
            <form className='grid gap-5' onClick={handleLogin}>
              <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border-b-4 bg-transparent outline-none' /><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="" placeholder='Password' className='border-b-4  bg-transparent mt-4 outline-none ' />
              </div>
              <div>
                <button className='rounded-full text-white bg-emerald-400 py-4 px-10' type="submit">Logout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Signout
