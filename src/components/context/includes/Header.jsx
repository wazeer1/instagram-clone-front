import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../assets/images/logo.png'
import AddIcon from '../../assets/images/add-icon.png'
import NotificationIcon from '../../assets/images/notification-icon.png'
import HomeIcon from '../../assets/images/home-icon.png'
import ProfileIcon from '../../assets/images/profile.png'
import AddPostModal from './AddPostModal'

const Header = () => {
    const handleAddModal = ()=>{
        setIsPost((prev)=>!prev)
    }
    const [isPost,setIsPost]=useState(false)
  return (
    <>
    <Cover>
        <Wrapper className='wrapper'>
            <Left>
                <img src={Logo} alt="instagram"/>
            </Left>
            <Center>
                <input type="text" placeholder="Search"/>
            </Center>
            <Right>
                <ul>
                    <li><img src={HomeIcon} alt="home"/></li>
                    <li onClick={()=>handleAddModal()}><img src={AddIcon} alt="home"/></li>
                    <li><img src={NotificationIcon} alt="home"/></li>
                    <li className='profile'><img src={ProfileIcon} alt=""/>
                        <ProfileMenu></ProfileMenu>
                    </li>
                </ul>
            </Right>
        </Wrapper>
        <AddPostModal isPost={isPost} setIsPost={setIsPost} handleAddModal={handleAddModal}/>
    </Cover>
    <Outlet/>
    </>
  )
}

export default Header
const Cover = styled.div`
    // width:100%;
    height:60px;
    background:#fff;
    border-bottom:1px solid #dbdbdb;
`;
const Wrapper = styled.div`
    width:70%;
    display:flex;
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
const Left = styled.div`
    width:120px;
    img{
        width:100%;
    }
`;
const Center = styled.div`
    width:250px;
    height:35px;
    background:red;
    overflow:hidden;
    border-radius:40px;
    background: #fafafa;
    border:1px solid #dbdbdb;
    input{
        width:100%;
        height:100%;
        padding-left:10px;
    }
`;
const Right =styled.div`
    width:250px;
    ul{
        display:flex;
        justify-content:space-between;
        li{
            list-style:none;
            width:40px;
            cursor:pointer;
            &.profile{
                border-radius:50%;
                overflow:hidden;
                position:relative;

            }
            img{
                width:100%;
            }
        }
    }
`;
const ProfileMenu = styled.div`
    
`;