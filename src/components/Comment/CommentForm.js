import {
    Button,
    CardContent,
    InputAdornment,
    OutlinedInput,
    createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const theme = createTheme({
});

function CommentForm(props) {
    const { userId, userName, postId } = props;
    const [text, setText] = useState("");

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleCommentText = (value) => {
        setText(value);
    };

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.text())
            .then((t) => console.log(t))
            .catch((err) => console.log(err));
    };

    return (
        <CardContent
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxlength: 150 }}
                fullWidth
                onChange={(i)=> handleCommentText(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link
                            style={{
                                textDecoration: "none",
                                boxShadow: "none",
                                color: "white",
                            }}
                            to={{ pathname: "/users/" + userId }}
                        >
                            <Avatar
                                sx={{
                                    background:
                                        "linear-gradient(45deg, #2196F3 30%, #08538c 90%)",
                                    width: theme.spacing(5),
                                    height: theme.spacing(5),
                                }}
                                aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background:
                                    "linear-gradient(45deg, #2196F3 30%, #08538c 90%)",
                                color: "white",

                            }}
                            onClick={handleSubmit}
                        >
                            Comment
                        </Button>
                    </InputAdornment>
                }
                style={{ input: { color: "red" }, backgroundColor: "white" }}
                value={text}
            ></OutlinedInput>
        </CardContent>
    );
}

export default CommentForm;
