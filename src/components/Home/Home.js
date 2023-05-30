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
                    setPostList(result.reverse());
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    if (error) {
        return <div> Error while loading the posts. Check connection. </div>;
    } else if (!isLoaded) {
        return <div> Loading....! This may take just a moment please be patient.</div>;
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f0f5ff",
                }}
            >
                {localStorage.getItem("currentUser") == null ? (
                    ""
                ) : (
                    <PostForm
                        userId={localStorage.getItem("currentUser")}
                        userName={localStorage.getItem("userName")}
                        refreshPosts={refreshPosts}
                    />
                )}
                {postList.map((post) => (
                    <Post
                        likes={post.likes}
                        postId={post.id}
                        userId={post.userId}
                        userName={post.userName}
                        title={post.title}
                        text={post.text}
                        storyDate={post.storyDate}
                        createDate={post.createDate}
                        lat={post.location == null ? null : post.location.lat}
                        lng={post.location == null ? null : post.location.lng}
                    ></Post>
                ))}
            </div>
        );
    }
}

export default Home;
