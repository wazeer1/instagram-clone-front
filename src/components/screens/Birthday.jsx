import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import BirthdayImage from "../assets/images/birthday.gif";
import { userConfig } from "../../axiosConfig";
import { useContext } from "react";
import { Context } from "../context/Store";

const Birthday = () => {
    const [date,setDate]=useState('')
   const {state:{userData:{access}},dispatch}=useContext(Context)
    const handleBirth=()=>{
        userConfig.post('accounts/setbirthday/',
        {
            dob:date
        },{
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }).then(function(res){
            if(res.data.StatusCode==6000){
                dispatch({
                    type: "UPDATE_USER_DATA",
                    payload: {
                        isVerified: true,
                    },
                });
            }
        })
    }
    return (
        <Cover>
            <Container>
                <Top>
                    <Logocnt>
                        <img src={BirthdayImage} alt="instagram" />
                    </Logocnt>
                    <h4>Add Your Birthday</h4>
                    <h5>This won't be a part of your public profile.</h5>
                    <h3>Why do I need to provide my birthday?</h3>
                </Top>
                <Bottom>
                    <InputContainer>
                        <input type="date" placeholder="date of birth" onChange={(e)=>setDate(e.target.value)}/>
                    </InputContainer>
                    <p>You need to enter the date you were born</p>
                    <p>
                        use your own birthdav, even if this account is for a
                        business, a pet, or something else
                    </p>
                    <NextButton onClick={()=>handleBirth()}>Next</NextButton>
                </Bottom>
            </Container>
        </Cover>
    );
};

export default Birthday;

const Cover = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    flex-direction: column;
    gap: 15px;
`;
const Container = styled.div`
    width: 25%;
    // height:400px;
    background: #fff;
    border: 0.4px solid #dbdbdb;
    padding: 20px;
`;
const Top = styled.div`
    margin-bottom: 25px;
    h4 {
        text-align: center;
        font-size: 18px;
    }
    h5 {
        text-align: center;
        font-size: 14px;
    }
    h3 {
        text-align: center;
        font-size: 14px;
        color: blue;
    }
`;
const Logocnt = styled.div`
    width: 40%;
    margin: 0 auto;
    img {
        width: 100%;
    }
`;
const Bottom = styled.div`
    text-align: center;
    p {
        width: 90%;
        margin: 0 auto;
        font-size: 14px;
        margin-bottom: 20px;
    }
`;
const InputContainer = styled.div`
    width: 90%;
    height: 35px;
    border: 0.6px solid #dbdbdb;
    padding-left: 6px;
    border-radius: 3px;
    overflow: hidden;
    background: #fafafa;
    margin: 0 auto;
    margin-bottom: 20px;
    input {
        width: 100%;
        height: 100%;
    }
`;
const NextButton = styled.div`
    width:90%;
    margin:0 auto;
    height:35px;
    background:#b2dffb;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-weight:600;
    cursor:pointer;
    border-radius:4px;
    &:hover{
        background:#86cefa;
    }
`;