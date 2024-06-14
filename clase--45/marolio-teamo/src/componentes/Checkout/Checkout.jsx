import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import config from "../../services/config";
import './Checkout.css';

const Checkout = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [error, setError] = useState("");

    const manejadorSubmit = (event) => {
        event.preventDefault();

        // Verificamos que todos los campos estén completos
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completa todos los campos.");
            return;
        }

        // Validamos que el campo del email coincida
        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden.");
            return;
        }

        // Creamos un objeto con todos los datos de la orden de compra
        const orden = {
            items: carrito.map(producto => ({
                producto: producto.item._id,
                cantidad: producto.cantidad
            })),
            total,
            nombre,
            apellido,
            telefono,
            email
        };

        // Realizamos la solicitud POST al backend
        config.post('/ordenes', orden)  // Cambia a '/api/ordenes'
            .then(response => {
                setOrdenId(response.data._id); // Suponiendo que el ID se devuelve en la respuesta del servidor
                vaciarCarrito();
            })
            .catch(error => {
                console.error('Error al realizar la compra:', error);
                setError("Error al realizar la compra. Por favor, inténtalo de nuevo más tarde.");
            });
    }

    return (
        <div>
            <h3> Checkout </h3>

            <form onSubmit={manejadorSubmit} className="formulario">
                {
                    carrito.map(producto => (
                        <div key={producto.item._id}>
                            <p> {producto.item.nombre} x {producto.cantidad} </p>
                            <p> Precio: $ {producto.item.precio} </p>
                            <hr />
                        </div>
                    ))
                }
                <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <button type="submit" className="btn"> Finalizar Orden </button>

                {
                    ordenId && (
                        <strong className="ordenId">¡Gracias por su compra! Tu número de orden es: {ordenId} </strong>
                    )
                }

            </form>
        </div>
    )
}

export default Checkout;
