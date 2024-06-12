import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({_id, nombre, stock,  precio, img}) => {
  return (
    <div className='cardProducto'>
        <img src={img} alt={nombre} />
        <h3>Nombre: {nombre} </h3>
        <p>Precio: {precio} </p>
        <p>ID: {_id} </p>
        <p>STOCK: {stock} </p>
        <Link className='btn' to={`/item/${_id}`}> Ver Detalles </Link>
    </div>
  )
}

export default Item