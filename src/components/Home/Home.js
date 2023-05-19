import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import PostForm from "../Post/PostForm";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("/posts")
        .then((res) => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }

    useEffect(() => {
        refreshPosts()
    }, []);

    if (error) {
        return <div> ERRRROOORRR! </div>;
    } else if (!isLoaded) {
        return <div> Loading.:.:.:.: </div>;
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#f0f5ff',
                }}
            >
                <PostForm userId={1} userName={"salih"} refreshPosts = {refreshPosts} />
                {postList.map((post) => (
                    <Post likes={post.likes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                ))}
            </div>
        );
    }
}

export default Home;
