import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import Home from './pages/Home'
import Signup from './pages/Signup'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/signin' element={<Signin />} />
                <Route path='/signout' element={<Signout/>} />
                <Route path='/' element={<Signup/>} />
                <Route path='/Home' element={<Home />} />
            </Routes>
        </>
    )
}

export default AppRoutes
