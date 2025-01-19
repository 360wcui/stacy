import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SERVER_URL} from "../variables";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/users/login`, { username, password });
            if (response.data === "Login successful") {
                navigate('/inventory');
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>User Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button data-testid="button"  onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;