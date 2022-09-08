import React, { useContext, useState } from "react";
import styled from "styled-components";
import { userConfig } from "../../../axiosConfig";
import Avatarimg from "../../assets/images/profile.png";
import SendImg from "../../assets/images/send.png";
import CloseImg from "../../assets/images/close.png";
import { Context } from "../Store";

const Comments = ({ commentScreen, commentList, postId, setCommentList,setLiked ,setCommentScreen}) => {
    const {
        state: {
            userData: { access },
        },
    } = useContext(Context);
    const [commentType, setCommentType] = useState("");
    const updateComment = () => {
        userConfig
            .post(
                `posts/comment/post/${postId}/`,
                {
                    comment: commentType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                }
            )
            .then(function (res) {
                if (res.data.StatusCode == 6000) {
                    userConfig
                        .get(`posts/view/comment/${postId}/`, {
                            headers: {
                                Authorization: `Bearer ${access}`,
                            },
                        })
                        .then(function (res) {
                            if (res.data.StatusCode == 6000) {
                                setCommentList(res.data.data.data);
                                setCommentType('')
                                setLiked((prev)=>!prev)
                            }
                        });
                }
            });
    };
    return (
        <Cover commentScreen={commentScreen}>
            <Top onClick={()=>setCommentScreen(false)}>
                <img src={CloseImg} alt="close"/>
            </Top>
            <CommentDatas>
                {commentList.map((item) => (
                    <CommentCover>
                        <Avatar>
                            <img src={Avatarimg} alt="avt" />
                        </Avatar>
                        <Datas>
                            <h4>{item.comment}</h4>
                        </Datas>
                    </CommentCover>
                ))}
            </CommentDatas>
            <SendCommentCover>
                <InputContainer>
                    <input
                        type="text"
                        placeholder="type your comments..."
                        value={commentType}
                        onChange={(e) => setCommentType(e.target.value)}
                    />
                </InputContainer>
                <SendImage onClick={() => updateComment()}>
                    <img src={SendImg} alt="send" />
                </SendImage>
            </SendCommentCover>
        </Cover>
    );
};

export default Comments;
const Cover = styled.div`
    position: absolute;
    width: 40%;
    height: 95vh;
    right: ${({ commentScreen }) => (commentScreen ? "0" : "-50%")};
    top: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: #fafafa;
    border-left: 1px solid #141414;
    transition: 0.4s ease;
    padding: 20px;
`;
const CommentDatas = styled.div`
    height: 95%;
    // background:red;
`;
const CommentCover = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
`;
const Avatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
    }
`;
const Datas = styled.div`
    padding: 10px;
    background: #fff;
    border-radius: 20px;
`;
const SendCommentCover = styled.div`
    padding: 7px;
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    gap: 10px;
`;
const InputContainer = styled.div`
    width: 90%;
    background: #fff;
    height: 35px;
    overflow: hidden;
    border-radius: 20px;
    input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
    }
`;
const SendImage = styled.div`
    width: 5%;
    cursor: pointer;
    img {
        width: 100%;
    }
`;
const Top = styled.div`
    width:30px;
    float:right;
    cursor:pointer;
    img{
        width:100%;
    }
`;