import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {

        fetch("/api/auth/"+path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {localStorage.setItem("tokenKey",result.message);
            localStorage.setItem("currentUser",result.userId);
            localStorage.setItem("userName",username)})
            .catch((err) => console.log(err));
    }

    let navigate = useNavigate();

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        navigate("/");
    }

    return (
        <FormControl>
            <InputLabel style={{ top: 40 }}>Username</InputLabel>
            <Input
                style={{ top: 40 }}
                onChange={(i) => handleUsername(i.target.value)}
            />
            <InputLabel style={{ top: 140 }}>Password</InputLabel>
            <Input
                style={{ top: 100 }}
                onChange={(i) => handlePassword(i.target.value)}
            />

            <Button
                variant="contained"
                style={{
                    marginTop: 160,
                    background:
                        "linear-gradient(45deg, #278c31 30%, #27b835 90%)",
                    color: "white",
                }}
                onClick={() => handleButton("register")}
            >
                Register
            </Button>

            <FormHelperText sx={{ margin: "20px" }}>
                Already Have an Account?
            </FormHelperText>

            <Button
                variant="contained"
                style={{
                    background:
                        "linear-gradient(45deg, #d6a12d 30%, #f2d855 90%)",
                    color: "white",
                }}
                onClick={() => handleButton("login")}
            >
                Log In
            </Button>
        </FormControl>
    );
}

export default Auth;
