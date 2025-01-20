import React, {useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from "../variables";
import { useNavigate } from "react-router-dom";
import {Box, Button, Card, CardContent, CardHeader, Container, TextField, Typography} from '@mui/material';

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmedPassword: ''
    })

    const [error, setError] = useState("")

    const navigation = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmedPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('')

        try {
            const response = await axios.post(`${SERVER_URL}/api/users/register`, formData);

            if(response.status === 201) {
                const { token, userId } = response.data;

                // Store the token securely in localStorage or sessionStorage
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', userId);

                navigation('/success')
            } else {
                const errorText = await response.text();
                setError(errorText)
            }
        } catch(err) {
            setError('Something wrong during user registration')
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Card sx={{ maxWidth: 700, margin: '30px auto', border: '1px solid #356' }}>
            <CardHeader>
                Login
            </CardHeader>
            <CardContent>
                <Container maxWidth="xs">
                    <Box sx={{ mt: 0}}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Register
                        </Typography>

                        <form onSubmit={handleRegister}>
                                    <TextField
                                        data-testid="firstName"
                                        label="First Name"
                                        name="firstName"
                                        fullWidth
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        data-testid="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        fullWidth
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        data-testid="username"
                                        label="Username"
                                        name="username"
                                        fullWidth
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        data-testid="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        fullWidth
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        data-testid="confirmedPassword"
                                        label="Confirm Password"
                                        name="confirmedPassword"
                                        type="password"
                                        fullWidth
                                        value={formData.confirmedPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                {error &&
                                        <Typography color="error" variant="body2">
                                            {error}
                                        </Typography>
                                }
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Register
                            </Button>
                        </form>
                    </Box>
                </Container>
            </CardContent>
        </Card>
    )
}

export default Register;