import React from 'react'
import './App.css'

import Home from './Componenet/Home/Home'
// import Body from './Componenet/Body/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './Componenet/Registration/Login'
import Signup from './Componenet/Registration/Signup'
import Otp from './Componenet/Registration/Otp'
import CV from './Componenet/CV/CV'
import CVBody from './Componenet/CV/CVBody'
// import Background3d from './Componenet/Body/Background3d'

const App = () => {
  return (
    <>
    {/* <Background3d /> */}
  
      <Routes>
        <Route path="/" element={<CV />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Otp" element= {<Otp />} />
        <Route path= "/CVBody" element= {<CVBody />} />
        
      </Routes>
      {/* 
      <Body /> */}
      
   </>
  )
}

export default App