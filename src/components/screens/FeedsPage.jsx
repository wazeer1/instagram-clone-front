import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/Store";
import UserScreen from "./UserScreen";
import ProfilePic from '../assets/images/profile.png'
import Posts from "./Posts";

const FeedsPage = () => {
    const {
        state: { userDetails },
    } = useContext(Context);
    return (
        <Cover>
            <FullCover>
                <Left>
                    <StatusBar></StatusBar>
                    <PostsSection><Posts/></PostsSection>
                </Left>
                <Right>
                    <MyProfile>
                        <Left1>
                            <Avatar>
                                <img src={ProfilePic} alt={userDetails.name} />
                            </Avatar>
                            <Details>
                                <h4>{userDetails.name}</h4>
                                <h5>{userDetails.username}</h5>
                            </Details>
                        </Left1>
                    </MyProfile>
                    <UserScreen />
                </Right>
            </FullCover>
        </Cover>
    );
};

export default FeedsPage;
const Cover = styled.div`
    display: flex;
    justify-content: center;
`;
const FullCover = styled.div`
    width: 75%;
    height: 300px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
`;
const Left = styled.div`
    width: 60%;
    height: 200px;
    // margin-bottom:15px;
    // display:flex;
    // flex-direction: column;
    // gap:15px;
    // background:blue;
`;
const StatusBar = styled.div`
    height: 100px;
    // background:green;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin-bottom:20px;
`;
const Right = styled.div`
    width: 36%;
    height: 200px;
`;
const MyProfile = styled.div`
    width: 95%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left1 = styled.div`
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
const PostsSection = styled.div`
    padding:20px;
    border-radius:8px;
    height:538px;
    border: 1px solid #dbdbdb;
    // overflow-y:scroll;
`;
const Details = styled.div``;
// const Right = styled.div`
//     padding:6px 16px;
//     background:blue;
//     display:inline-block;
//     border-radius:10px;
//     color:#fff;
//     font-weight:700;
//     cursor:pointer;
// `;