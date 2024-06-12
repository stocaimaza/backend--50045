import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import config from "../../services/config";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const { idItem } = useParams();

  useEffect(() => {
    // Hacer una solicitud GET al endpoint /productos/{idItem} del backend
    config.get(`/productos/${idItem}`)
      .then(response => {
        setProducto(response.data); // Suponiendo que los datos del producto se devuelven como un objeto
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
      });
  }, [idItem]);

  return (
    <div>
      {producto && <ItemDetail {...producto} />}
    </div>
  )
}

export default ItemDetailContainer;
