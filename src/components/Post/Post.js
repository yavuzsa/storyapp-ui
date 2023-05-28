import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post(props) {
    const { title, text, userName, userId, postId, likes, storyDate, createDate, lat, lng } = props;
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeId,setLikeId] = useState(null);
    const [dateInfo, setDateInfo] = useState("");

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };
    
    const handleLike = () => { 
        setIsLiked(!isLiked);
        if(!isLiked) {
            saveLike();
            setLikeCount(likeCount + 1)
        } else {
            deleteLike();
            setLikeCount(likeCount - 1)
        }
    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
        .then((res) => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }

    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser")
            }),
        })
            .then((res) => res.text())
            .catch((err) => console.log(err));
    };

    const checkLikes = () => {
        var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
        if(likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization" : localStorage.getItem("tokenKey"),
            },
        })
        .catch((err) => console.log(err));
    }

    const formatDate = (date) => {
        if (date == null) {
            return "";
        }
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });    
    }

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            refreshComments()
        }
    }, []);


    useEffect(() => {checkLikes()},[])

    return (
        <div className="postContainer">
            <Card sx={{ width: "800px", textAlign: "left", margin: "20px" }}>
                <CardHeader
                    avatar={
                        <Link
                            style={{
                                textDecoration: "none",
                                boxShadow: "none",
                                color: "white",
                            }}
                            to={{ pathname: "/users/" + userId }}
                        >
                            <Avatar
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #08538c 90%)' }}
                                aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                    subheader={createDate}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {localStorage.getItem("currentUser") == null ? "Likes: " :
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? {color: "red"} : null} />
                    </IconButton>}
                    {likeCount}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div sx={{ width: "800px", textAlign: "left", margin: "20px"}}>
                        {error? "error" : 
                        isLoaded? commentList.map(comment => (
                            <Comment userId = {1} userName = {"USER"} text = {comment.text}>
                            </Comment>
                        )):"Loading Comments..."}
                        {localStorage.getItem("currentUser") == null ? "" : 
                        <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>}
                    </div>
                </Collapse>
                <CardContent>
                    <div>
                        {storyDate}
                    </div>
                </CardContent>
                <CardContent>
                    <div>
                        {lat} "  " {lng}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Post;
