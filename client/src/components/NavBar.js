import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const NavBar = ({hasJwtToken, setHasJwtToken}) => {

    const navigate = useNavigate()
    const handleLoginClick = () => {
        const token = localStorage.getItem('jwtToken');
        setHasJwtToken(false)
        if (token !== null) {
            localStorage.clear();
            console.log("fired,  cleared")
        }
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register"); // Replace with your desired route
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setHasJwtToken(token !== null)
    }, [])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Inventory Management System
                    </Typography>
                    <Button onClick={handleLoginClick} color="inherit">{hasJwtToken ? 'Logout' : 'Login'}</Button>
                    <Button onClick={handleRegisterClick} color="inherit">Register</Button>
                    {/*<a href='/register'>REGISTER</a>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;