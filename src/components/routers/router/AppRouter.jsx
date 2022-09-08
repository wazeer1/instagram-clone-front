import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { userConfig } from '../../../axiosConfig'
import Header from '../../context/includes/Header'
import { Context } from '../../context/Store'
import FeedsPage from '../../screens/FeedsPage'
import Notification from '../../screens/Notification'

const AppRouter = () => {
    const {state:{userData:{access}},state,dispatch}=useContext(Context)
    console.log(state);
    useEffect(()=>{
        userConfig.get('accounts/minimals/',{
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }).then(function(res){
            dispatch({
                type: "UPDATE_USER_DETAILS",
                payload: {
                    name:res.data.data.data.name,
                    photo:res.data.data.data.photo,
                    phone:res.data.data.data.phone,
                    username:res.data.data.data.username

                },
            });
        })
    },[])
  return (
    <Cover>
        <Routes>
            <Route path='/' element={<Header/>}>
                <Route path='/' element={<FeedsPage/>}/>
                <Route path='/notification' element={<Notification/>}/>
            </Route>
        </Routes>
    </Cover>
  )
}

export default AppRouter
const Cover = styled.div`
    width:100%;
    height:100vh;
    background: #fafafa;;
`;