import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Birthday from '../../screens/Birthday'
import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'

const AuthRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/birthday" element={<Birthday/>}/>
    </Routes>
  )
}

export default AuthRouter