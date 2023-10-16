import { useEffect, useState } from 'react'

import uuid from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Components/Sidebar'
import MainNote from './Components/MainNote'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import AppRoutes from './Routes'


function App() {
  return <AppRoutes />
}

export default App
