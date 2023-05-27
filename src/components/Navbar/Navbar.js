import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LockOpen } from "@mui/icons-material";

function Navbar() {

    let navigate = useNavigate();

    const handleLock = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem('userName')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: "left",
                            }}
                        >
                            <Link
                                style={{
                                    textDecoration: "none",
                                    boxShadow: "none",
                                    color: "white",
                                }}
                                to="/"
                            >
                                Home
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                            {localStorage.getItem("currentUser") == null ? (
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        boxShadow: "none",
                                        color: "white",
                                        margin: "20px",
                                    }}
                                    to="/auth"
                                >
                                    Login or Register
                                </Link>
                            ) : (
                                <div>
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        boxShadow: "none",
                                        color: "white",
                                        margin: "20px",
                                    }}
                                    to="/auth"
                                    onClick={() => handleLock()}
                                >
                                    Log Out
                                </Link>
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        boxShadow: "none",
                                        color: "white",
                                        margin: "20px",
                                    }}
                                    to={{ pathname: "/users/" + localStorage.getItem("currentUser") }}
                                >
                                    Profile
                                </Link>
                                </div>
                            )}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {localStorage.getItem("currentUser") != null ? 
                            (<Link
                                style={{
                                    textDecoration: "none",
                                    boxShadow: "none",
                                    color: "white",
                                }}
                                to="/createstory"
                            >
                                Create Story
                            </Link> )
                            : (<div></div>) }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Navbar;
