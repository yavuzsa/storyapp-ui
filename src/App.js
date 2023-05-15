import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import CreateStory from "./components/Story/CreateStory";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/users/:userId" element={<User />}></Route>
                    <Route path="/createstory" element={<CreateStory />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
