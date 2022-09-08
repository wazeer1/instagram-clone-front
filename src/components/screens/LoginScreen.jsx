import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userConfig } from "../../axiosConfig";
import Logo from "../assets/images/logo.png";
import { Context } from "../context/Store";

const LoginScreen = () => {
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const {dispatch}=useContext(Context)
    const navigate = useNavigate()
    const handleLogin=()=>{
        userConfig.post('accounts/login/',{
            phone:phone,
            password:password,
        }).then(function(res){
            if(res.data.StatusCode==6000){
                dispatch({
                    type: "UPDATE_USER_DATA",
                    payload: {
                        isVerified: true,
                        access:res.data.data.acess.access,
                    },
                });
                navigate('/')
            }
        })
    }
    return (
        <Cover>
            <Container>
                <Top>
                    <Logocnt>
                        <img src={Logo} alt="instagram" />
                    </Logocnt>
                </Top>
                <Bottom>
                    <InputContainer>
                        <input type="text" placeholder="Phone number,username or email " onChange={(e)=>setPhone(e.target.value)}/>
                    </InputContainer>
                    <InputContainer>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </InputContainer>
                    <SubmitButton onClick={()=>handleLogin()}>Login</SubmitButton>
                </Bottom>
                <Line/>
                <BottomCreate>
                    <h4>Forgot Password ?</h4>
                </BottomCreate>
            </Container>
            <SecondContainer>
            Don't have an account? <Link to="/auth/register">Sign up</Link>
            </SecondContainer>
        </Cover>
    );
};

export default LoginScreen;
const Cover = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    flex-direction: column;
    gap:15px;
`;
const Container = styled.div`
    width: 25%;
    // height:400px;
    background: #fff;
    border: 0.4px solid #dbdbdb;
    padding: 20px;
`;
const Top = styled.div`
    margin-bottom:25px;
`;
const Logocnt = styled.div`
    width: 50%;
    margin: 0 auto;
`;
const Bottom = styled.div`
    padding-bottom:20px;
`;
const InputContainer = styled.div`
    width:90%;
    height:35px;
    border:.6px solid #dbdbdb;
    padding-left:6px;
    border-radius:3px;
    overflow:hidden;
    background:#fafafa;
    margin:0 auto;
    margin-bottom:20px;
    input{
        width:100%;
        height:100%;
    }
`;
const SubmitButton = styled.div`
    width:90%;
    height:35px;
    background:#b2dffb;
    margin:0 auto;
    border-radius:3px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-weight:600;
    cursor:pointer;
    &:hover{
        background:#86cefa;
    }
`;
const Line = styled.hr`
    width:100%;
    height:.4px;
    background:#dbdbdb;
`;
const BottomCreate = styled.div`
    text-align:center;
    padding-top:20px;
    h4{
        font-weight:300;
        font-size:16px;
    }
`;
const SecondContainer = styled.div`
    width:25%;
    padding:20px;
    background: #fff;
    border: 0.4px solid #dbdbdb;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:400;
    span{
        font-weight:700;
        color:blue;
        cursor:pointer;
    }
`;
