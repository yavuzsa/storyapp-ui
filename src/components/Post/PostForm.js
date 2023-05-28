import React, { useState, useEffect, useRef } from "react";
import { Link, json, useHistory } from "react-router-dom";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputAdornment } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function PostForm(props) {
    const { userName, userId, refreshPosts } = props;

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [isSent, setIsSent] = useState(false);
    const [location, setLocation] = useState(null);
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
                storyDate: selectedDate,
                location: location,
            }),
        })
            .then((res) => res.text())
            .then((t) => console.log(t))
            .catch((err) => console.log(err));
    };

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    };

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleLocation = (loc) => {
        setLocation(loc);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSent(false);
    };

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const handleLocationSelect = () => {
        const place = mapRef.current.getPlace();
        if (place.geometry && place.geometry.location) {
            // Handle the selected location
            console.log("Selected Location:", place.geometry.location.toJSON());
        }
    };

    useEffect(() => {
        // Load the Google Maps JavaScript API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAK5teEp-nMGTg2_pH55DxFQTmqouM4wug&libraries=places`;
        script.defer = true;
        script.async = true;
        script.onload = () => {
            // Initialize the Autocomplete service
            const autocompleteService =
                new window.google.maps.places.AutocompleteService();
            const autocompleteOptions = {
                types: ["geocode"],
            };

            const locationInput = document.getElementById("locationInput");
            const autocomplete = new window.google.maps.places.Autocomplete(
                locationInput,
                autocompleteOptions
            );

            // Set the Autocomplete's place_changed event listener
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    // Handle the selected location
                    console.log(
                        "Selected Location:",
                        place.geometry.location.toJSON()
                    );
                    handleLocation(place.geometry.location);
                }
            });
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="postContainer">
            <Snackbar
                open={isSent}
                autoHideDuration={1600}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Story Sent!
                </Alert>
            </Snackbar>

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
                                sx={{
                                    background:
                                        "linear-gradient(45deg, #2196F3 30%, #08538c 90%)",
                                }}
                                aria-label="recipe"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <OutlinedInput
                            id="outline-adornment-amount"
                            multiline
                            placeholder="title"
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}
                        ></OutlinedInput>
                    }
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outline-adornment-amount"
                            multiline
                            placeholder="text"
                            inputProps={{ maxLength: 3000 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
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
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        ></OutlinedInput>
                    </Typography>
                </CardContent>

                <CardContent>
                    <DatePicker // React Date Picker component
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Select date"
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                    />
                </CardContent>

                <CardContent>
                    <div>
                        <input
                            id="locationInput"
                            type="text"
                            onChange={handleLocation}
                            placeholder="Select Location"
                            style={{ width: "100%", marginBottom: "10px" }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
