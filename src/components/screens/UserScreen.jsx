import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { userConfig } from '../../axiosConfig'
import { Context } from '../context/Store'
import SingleUserCard from './SingleUserCard'

const UserScreen = () => {
    const {state:{userData:{access}}} = useContext(Context)
    const [udateUser,setUpdateUser]=useState(false)
    const [usersList,setUserList]=useState([])
    console.log(usersList,'----');
    useEffect(()=>{
        userConfig.get('accounts/users/view/',{
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }).then(function(res){
            setUserList(res.data.data.data);
        })
    },[udateUser])
  return (
    <Cover>
       {usersList.map((item)=>(
        <SingleUserCard item={item} setUpdateUser={setUpdateUser}/>
       ))}
    </Cover>
  )
}

export default UserScreen
const Cover =styled.div`
    width:95%;
    height:400px;
    // overflow-y:scroll;
    // overflow-x:hidden;
`;