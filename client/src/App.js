import './App.css';

import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';
import Success from "./components/Success";
import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/success" element={<Success/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
