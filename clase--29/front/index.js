fetch("http://localhost:8080/api/order")
    .then(result => {
        if (!result.ok) {
            throw new Error('Error te vas a engripar todo el finde largo');
        }
        return result.json();
    })
    .then(json => {
        console.log(json);
        const ordersContainer = document.getElementById("orders");
        ordersContainer.innerHTML = ""; 
        if (json && json.length > 0) {
            json.forEach(order => {
                const div = document.createElement("div") ;
                div.innerHTML = `
                    <p>Orden Número: ${order.number}</p>
                    <p>Total de la orden: ${order.totalPrice}</p>
                    <p>Estatus: ${order.status}</p>
                `;
                ordersContainer.appendChild(div);
            });
        } else {
            ordersContainer.innerHTML = "<p>No hay órdenes disponibles.</p>";
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
