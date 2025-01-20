import './App.css';

import React, {useState} from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';
import Success from "./components/Success";
import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

    const [hasJwtToken, setHasJwtToken] = useState(false)

    return (
        <div>
            <BrowserRouter>
                <NavBar hasJwtToken={hasJwtToken} setHasJwtToken={setHasJwtToken} />
                <Routes>
                    <Route path="/" element={<Login hasJwtToken={hasJwtToken} setHasJwtToken={setHasJwtToken}/>}/>
                    <Route path="/register" element={<Register hasJwtToken={hasJwtToken} setHasJwtToken={setHasJwtToken}/>}/>
                    <Route path="/login" element={<Login hasJwtToken={hasJwtToken} setHasJwtToken={setHasJwtToken}/>} />
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/success" element={<Success/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
