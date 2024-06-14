import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/config';

const Pets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/pets')
            .then(response => {
                console.log('Datos de la API:', response.data);
                setPets(response.data.payload);
            })
            .catch(error => console.error('Error al obtener mascotas:', error));
    }, []);

    return (
        <div>
            <h1>Mascotas</h1>
            <ul>
                {pets.map(pet => (
                    <li key={pet._id}>{pet.name} - {pet.specie}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pets;
