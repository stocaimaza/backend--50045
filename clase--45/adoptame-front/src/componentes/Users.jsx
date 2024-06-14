import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/config';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/users")
            .then(response => {
                setUsers(response.data.payload);
                console.log(response.data.payload);
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.first_name} {user.last_name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
