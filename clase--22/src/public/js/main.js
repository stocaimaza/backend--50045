const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;

    let obj = {usuario, pass}; 

    fetch("/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" :"application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
        }
    })
    .then( result => result.json() )
    .then( json => {
        localStorage.setItem("authToken", json.token);
    })
})