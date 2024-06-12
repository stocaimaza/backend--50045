// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('/api/sessions/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            alert('Registro exitoso');
        } catch (error) {
            console.error('Error en el registro de usuario:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <input
                className="input-field"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className="input-field"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
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
                <button className="button" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Register;
