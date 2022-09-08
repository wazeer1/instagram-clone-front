import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../../context/Store'
import Approute from '../routes/Approute'
import Authroute from '../routes/AuthRoute'
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter'

const MainRouter = () => {
        const {dispatch}=useContext(Context)
        useEffect(()=>{
            let userData=localStorage.getItem('userData');
            userData = JSON.parse(userData);
            dispatch({
              type:"UPDATE_USER_DATA",
              payload: userData
            })
          },[])
  return (
    <Routes>
        <Route path='/*' element={<Approute><AppRouter/></Approute>}/>
        <Route path='/auth/*' element={<Authroute><AuthRouter/></Authroute>}/>
    </Routes>
  )
}

export default MainRouter