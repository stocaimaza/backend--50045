import { useState } from 'react';
import Contador from '../Contador/Contador';
import { Link } from 'react-router-dom';
import './ItemDetail.css';

//importamos el CarritoContext
import { CarritoContext } from '../../context/CarritoContext';

//importamos el hook useContext: 
import { useContext } from 'react';

const ItemDetail = ({_id, nombre, stock, precio, img}) => {
  //Creamos un estado local con la cantidad de productos agregados. 
  const [agregarCantidad, setAgregarCantidad]  = useState(0);

  //Cambios en la clase 6: 

  const {agregarAlCarrito} = useContext(CarritoContext);
  
  //

  //Creamos una función manejadora de la cantidad: 
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    //console.log("Productos agregados: " + cantidad);

    //Y ahora acá voy a crear un objeto con el item y la cantidad: 
    const item = {_id, nombre, precio};
    agregarAlCarrito(item, cantidad);
  }

  return (
    <div className='contenedorItem'>
        <h2>Nombre: {nombre} </h2>
        <p>Precio:{precio} </p>
        <p>ID:{_id} </p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima ducimus nisi deleniti libero quia molestiae magnam suscipit ad cumque et praesentium est, ullam recusandae eaque nobis corporis natus repudiandae necessitatibus!</p>
        <img src={img} alt={nombre} />
        {
          agregarCantidad > 0 ? (<Link to="/cart">Terminar Compra</Link>) : (<Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
        }
    </div>
  )
}

export default ItemDetail