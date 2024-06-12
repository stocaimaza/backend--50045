import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenidos a Adoptame</h1>
            <p>Encuentra a tu nuevo mejor amigo!</p>
            <div className="buttons-container">
                <Link to="/login" className="button">Iniciar sesión</Link>
                <Link to="/register" className="button">Registrarse</Link>
            </div>
        </div>
    );
};

export default Home;
