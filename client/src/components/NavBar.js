import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {bindMenu, bindTrigger, usePopupState,} from 'material-ui-popup-state/hooks'

const NavBar = ({hasJwtToken, setHasJwtToken}) => {

    const navigate = useNavigate()

    const [myAccountDisabled, setMyAccountDisabled] = useState(true);

    const handleDropdownClicked = () => {
        console.log("clicked")
        const token = localStorage.getItem('jwtToken');
        setMyAccountDisabled(token === null)
    }

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

    const handleViewMyAccount = () => {
        navigate("/inventory");
    }

    const handleViewAll = () => {
        navigate("/inventoryAll");
    }

    const MenuPopupState = () => {
        const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
        return (
            <div>
                <Button variant="contained" {...bindTrigger(popupState)} onFocus={handleDropdownClicked}>
                    Inventory
                </Button >
                <Menu {...bindMenu(popupState)}>
                    <MenuItem disabled={myAccountDisabled} onClick={handleViewMyAccount}>My Account</MenuItem>
                    <MenuItem onClick={handleViewAll}>View All</MenuItem>
                </Menu>
            </div>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Inventory Management System
                    </Typography>

                    <MenuPopupState />
                    <Button onClick={handleLoginClick} color="inherit">{hasJwtToken ? 'Logout' : 'Login'}</Button>
                    <Button onClick={handleRegisterClick} color="inherit">Register</Button>
                    {/*<a href='/register'>REGISTER</a>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;