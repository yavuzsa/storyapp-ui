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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    const { title, text, userName, userId, postId } = props;
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };
    
    const handleLike = () => { 
        setLiked(!liked);
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

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            refreshComments()
        }
    }, []);

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
                    subheader="May 9, 2023"
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon style={liked ? {color: "red"} : null} />
                    </IconButton>
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
                    <CardContent></CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default Post;
