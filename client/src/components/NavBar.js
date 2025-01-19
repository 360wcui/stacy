import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login"); // Replace with your desired route
    };

    const handleRegisterClick = () => {
        navigate("/register"); // Replace with your desired route
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Inventory Management System
                    </Typography>
                    <Button onClick={handleLoginClick} color="inherit">Login</Button>
                    <Button onClick={handleRegisterClick} color="inherit">Register</Button>
                    {/*<a href='/register'>REGISTER</a>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;