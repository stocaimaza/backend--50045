// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post('/api/sessions/login', { email, password });
            navigate('/users');
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <input
                className="input-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button-container">
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
