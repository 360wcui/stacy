import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SERVER_URL} from "../variables";
import {Box, Button, Card, CardContent, CardHeader, Container, TextField, Typography} from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const response = await axios.post(`${SERVER_URL}/api/users/login`, { username, password });
            if (response.status === 200) {
                const { token, userId } = response.data;
                // Store the token securely in localStorage or sessionStorage
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', userId);

                navigate('/inventory');
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError("Something is wrong");
        }
    };

    return (
        <Card sx={{ maxWidth: 900, margin: '30px auto', border: '1px solid #356' }}>
            <CardHeader>
                Login
            </CardHeader>
            <CardContent>
                <Container maxWidth="xs">
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Typography variant="h5" component="h1" align="center">
                            Login
                        </Typography>

                        {error && (
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}

                        <TextField
                            data-testid="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <TextField
                            data-testid="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button data-testid="button" type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </Container>
            </CardContent>

        </Card>

    )
}

export default Login;