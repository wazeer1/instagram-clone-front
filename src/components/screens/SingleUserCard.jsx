import React, { useContext } from 'react'
import styled from 'styled-components'
import { userConfig } from '../../axiosConfig'
import ProfilePic from '../assets/images/profile.png'
import { Context } from '../context/Store'

const SingleUserCard = ({item,setUpdateUser}) => {
    const {state:{userData:{access}}}=useContext(Context)
    const handleFollow = ()=>{
        userConfig.get(`accounts/send/request/${item.id}/`,{
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }).then(function(res){
            if(res.data.StatusCode == 6000){
                setUpdateUser((prev)=>!prev)
            }
        })
    }
  return (
    <Cover status ={item.followed}>
        <Left>
            <Avatar>
                <img src={ProfilePic} alt={item.name}/>
            </Avatar>
            <Details>
                <h4>{item.name}</h4>
                <h5>{item.username}</h5>
            </Details>
        </Left>
        <Right onClick={()=>handleFollow()} status={item.followed}>{item.followed == 'not_send' ? 'Follow' : 'Requested'}</Right>
    </Cover>
  )
}

export default SingleUserCard
const Cover = styled.div`
    width:100%;
    padding:10px;
    display:${({status})=>status == 'true' ? 'none' : 'flex'};
    justify-content:space-between;
    align-items:center;
`;
const Left = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
`;
const Avatar = styled.div`
    width:50px;
    height:50px;
    border-radius:50%;
    overflow:hidden;
    img{
        width:100%;
    }
`;
const Details = styled.div``;
const Right = styled.div`
    padding:6px 16px;
    background:${({status})=>status == 'not_send' ? 'blue' : '#fff'};
    display:inline-block;
    border-radius:10px;
    color:${({status})=>status == 'not_send' ? '#fff' : '#141414'};
    font-weight:700;
    cursor:pointer;
    border:${({status})=>status == 'not_send' ? null : '.4px dashed #141414'};

`;