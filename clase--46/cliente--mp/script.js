//Integramos MercadoPago del lado del cliente: 

const mp = new MercadoPago("", { locale: "es-AR" });

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Pasamos los datos del producto: 

        const orderData = {
            title: "Patito",
            quantity: 1,
            price: 100
        }

        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);
    } catch (error) {
        console.log("Tenemos un error, no vamos a recibir nuestro patito tan deseado");
        alert("ERROR FATAL, LLUEVE TODO EL FERIADO!");
    }
})


const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if(window.checkoutButton) window.checkoutButton.unmount()
            //Si ya existe el boton, lo vamos a desmontar de la pagina. 
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent(); 
}