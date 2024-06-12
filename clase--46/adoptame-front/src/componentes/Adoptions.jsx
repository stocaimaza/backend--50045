import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/config';

const Adoptions = () => {
    const [adoptions, setAdoptions] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/adoptions')  
            .then(response => {
                console.log('Datos de la API:', response.data);
                setAdoptions(response.data.payload);
            })
            .catch(error => console.error('Error al obtener adopciones:', error));
    }, []);

    return (
        <div>
            <h1>Adopciones</h1>
            <ul>
                {adoptions.map(adoption => (
                    <li key={adoption._id}>Owner: {adoption.owner}, Pet: {adoption.pet}</li>
                ))}
            </ul>
        </div>
    );
};

export default Adoptions;
