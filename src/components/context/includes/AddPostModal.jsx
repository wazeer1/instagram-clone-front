import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/close.png";
import { useDropzone } from "react-dropzone";
import { userConfig } from "../../../axiosConfig";
import { Context } from "../Store";

const AddPostModal = ({isPost,setIsPost,handleAddModal}) => {
    const [description, setDiscription] = useState("");
    const {
        state: {
            userData: { access },
        },
    } = useContext(Context);
    const handlePost = () => {
        const formData = new FormData();
        files.map((item) => {
            formData.append("post", item);
        });
        formData.append("description", description);
        userConfig.post(
            "posts/create/post/",formData,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            }
        );
    };
    const [imageSent, setImageSent] = useState([]);
    const [files, setFiles] = useState([]);
    const getColor = (props) => {
        if (props.isDragAccept) {
            return "#00e676";
        }
        if (props.isDragReject) {
            return "#ff1744";
        }
        if (props.isFocused) {
            return "#2196f3";
        }
        return "#eeeeee";
    };
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
    console.log(files, "---===");
    const thumbs = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} />
            </div>
        </div>
    ));
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
    const [images, setImages] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImages((prevState) => [
                    ...prevState,
                    { id: index, src: e.target.result },
                ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);
    function DropBox({ onDrop }) {
        const {
            getRootProps,
            getInputProps,
            acceptedFiles,
            open,
            isDragAccept,
            isFocused,
            isDragReject,
        } = useDropzone({
            accept: "image/*",
            onDrop,
            noClick: true,
            noKeyboard: true,
        });
        const lists = acceptedFiles.map((list) => (
            <li key={list.path}>
                {list.path} - {list.size} bytes
            </li>
        ));
    }
    const handleFile = (e) => {
        setImageSent(e.target.files[0]);
      };
    return (
        <Cover isPost={isPost}>
            <Container>
                <Top>
                    <h4>Add you post</h4>
                    <h5 onClick={()=>handleAddModal()}>
                        <img src={CloseIcon} alt="close" />
                    </h5>
                </Top>
                <Bottom>
                    <InputContainer
                        {...getRootProps({ className: "dropzone" })}
                    >
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                        <input
                            {...getInputProps({
                                onChange: handleFile,
                            })}
                        />
                    </InputContainer>
                    {/* <aside>
                        <h4>List</h4>
                        <p>{lists}</p>
                    </aside> */}
                    <TextField
                        onChange={(e) => setDiscription(e.target.value)}
                    ></TextField>
                    <ButtonSubmit onClick={() => handlePost()}>
                        SUBMIT
                    </ButtonSubmit>
                </Bottom>
            </Container>
        </Cover>
    );
};

export default AddPostModal;
const Cover = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background: #00000090;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    transform:${({isPost})=>isPost ? 'scale(1)' : 'scale(0)'};
    transition:.4s ease;
`;
const Container = styled.div`
    width: 70%;
    // height: 400px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
`;
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #141414;
    h4 {
        font-size: 22px;
    }
    h5 {
        width: 30px;
        cursor: pointer;
        img {
            width: 100%;
        }
    }
`;
const Bottom = styled.div``;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    border-width: 2px;
    border-radius: 10px;
    height: 300px;
    border-style: dashed;
    background-color: #fafafa;
    color: black;
    font-weight: bold;
    font-size: 1.4rem;
    outline: none;
    transition: border 0.24s ease-in-out;
`;
const TextField = styled.textarea`
    width: 96%;
    height: 100px;
    margin-top: 20px;
    outline: none;
    border-radius: 20px;
    padding: 20px;
`;
const ButtonSubmit = styled.div`
    width: 130px;
    height: 35px;
    background: green;
    margin-top: 20px;
    float: right;
    border-radius: 6px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
`;
