import React, { useState } from 'react';
import axios from 'axios';
import {SERVER_URL} from "../variables";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/users/register`, { username, password });
            alert(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register Now</button>
        </div>
    );
}

export default Register;