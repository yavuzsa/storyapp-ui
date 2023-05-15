import { CardContent, InputAdornment, OutlinedInput, createTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const theme = createTheme({
    spacing: 7,
  });

function Comment(props) {
    const { text, userId, userName } = props;

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
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxlength: 100 }}
                fullWidth
                value={text}
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
                                    width: theme.spacing(4),
                                    height: theme.spacing(4),
                                }}
                                aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{ input: { color: 'red' }, backgroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    );
}

export default Comment;
