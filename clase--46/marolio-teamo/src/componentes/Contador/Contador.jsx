import { useState } from "react";

const Contador = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);
    

    const sumarContador = () => {
        if(contador < stock ){
            setContador(contador + 1);
        }
    }

    const restarContador = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }

  return (
    <>
        <div>
            <button onClick={restarContador} className="btn"> - </button>
            <p> {contador} </p>
            <button onClick={sumarContador} className="btn"> + </button>
        </div>

        <button className="btn" onClick={()=> funcionAgregar(contador)}> Agregar al Carrito </button>
    </>
  )
}

export default Contador