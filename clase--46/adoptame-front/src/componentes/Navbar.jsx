import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">Usuarios</Link>
                </li>
                <li>
                    <Link to="/pets">Mascotas</Link>
                </li>
                <li>
                    <Link to="/adoptions">Adopciones</Link>
                </li>
            </ul>
            <img src="./img/logo.png" alt="Logo" />
        </nav>
    );
};

export default Navbar;
