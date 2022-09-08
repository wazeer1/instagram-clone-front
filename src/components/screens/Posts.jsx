import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userConfig } from "../../axiosConfig";
import { Context } from "../context/Store";
import ProfilePic from "../assets/images/profile.png";
import LikeIcon from "../assets/images/heart-blank.png";
import LikeIconFill from "../assets/images/heart-fill.png";
import CommentImg from "../assets/images/comment-icon.png";
import Comments from "../context/includes/Comments";

const Posts = () => {
    const {
        state: {
            userData: { access },
        },
    } = useContext(Context);
    const [liked, setLiked] = useState(false);
    const [posts, setPosts] = useState([]);
    const [commentScreen, setCommentScreen] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [postId, setPostId] = useState("");
    useEffect(() => {
        userConfig
            .get("posts/view/posts/", {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(function (res) {
                if (res.data.StatusCode == 6000) {
                    setPosts(res.data.data.data);
                }
            });
    }, [liked]);
    const handleLike = (item) => {
        userConfig
            .get(`posts/like/post/${item.id}/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(function (res) {
                if (res.data.StatusCode == 6000) {
                    setLiked((prev) => !prev);
                }
            });
    };
    const handleComment = (item) => {
        setCommentScreen(true);
        setPostId(item.id);
        userConfig
            .get(`posts/view/comment/${item.id}/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(function (res) {
                if (res.data.StatusCode == 6000) {
                    setCommentList(res.data.data.data);
                }
            });
    };
    console.log(posts);
    return (
        <Cover>
            {posts.map((item) => (
                <Container>
                    <Top>
                        <Left>
                            <Avatar>
                                <img
                                    src={ProfilePic}
                                    alt={item.profile.username}
                                />
                            </Avatar>
                            <Details>
                                <h4>{item.profile.name}</h4>
                                <h4>{item.profile.username}</h4>
                            </Details>
                        </Left>
                    </Top>
                    <PostData>
                        <img src={item.post} alt="post" />
                    </PostData>
                    <LikeSection>
                        <TopDescri>
                            <h5>{item.description}</h5>
                        </TopDescri>
                        <CoverContent>
                            <LikeData onClick={() => handleLike(item)}>
                                <LikeButton>
                                    <img
                                        src={
                                            item.liked == "true"
                                                ? LikeIconFill
                                                : LikeIcon
                                        }
                                        alt="like"
                                    />
                                </LikeButton>
                                <h4>{item.likes_count} Likes</h4>
                            </LikeData>
                            <CommentCover>
                                <CommentIcon
                                    onClick={() => handleComment(item)}
                                >
                                    <img src={CommentImg} alt="cmt" />
                                </CommentIcon>
                                <h4>{item.comment_count} Comments</h4>
                            </CommentCover>
                        </CoverContent>
                    </LikeSection>
                    <hr/>
                </Container>
            ))}
            <Comments
                commentScreen={commentScreen}
                commentList={commentList}
                postId={postId}
                setCommentList={setCommentList}
                setLiked={setLiked}
                setCommentScreen={setCommentScreen}
            />
        </Cover>
    );
};

export default Posts;
const Cover = styled.div`
    padding: 0px 20px;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const Container = styled.div`
    hr{
        width:100%;
        height:1px;
        background:#141414;
    }
`;
const Top = styled.div`
    padding: 10px 0px;
`;
const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
    }
`;
const Details = styled.div``;
const PostData = styled.div`
    width: 100%;
    height: 400px;
    padding: 8px;
    border: 0.6px solid #141414;
    img {
        width: 100%;
        height: 100%;
    }
`;
const LikeSection = styled.div`
    width: 100%;
    height: 80px;
`;
const TopDescri = styled.div``;
const LikeData = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;
const LikeButton = styled.div`
    width: 30px;
    cursor: pointer;
    img {
        width: 100%;
    }
`;
const CoverContent = styled.div`
    display: flex;
    gap: 15px;
`;
const CommentCover = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;
const CommentIcon = styled.div`
    width: 30px;
    cursor: pointer;
    img {
        width: 100%;
    }
`;
