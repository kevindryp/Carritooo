const form = document.querySelector("form")



const validarUsuario = async() => {
    const local = {
        id: "",
        correo: "",
        password: ""
    }
    const email = document.getElementById("correo").value
    const pass = document.getElementById("passw").value
    const response = await fetch("http://ec2-3-143-209-122.us-east-2.compute.amazonaws.com:8000/Clientes/")
    const data = await response.json()
    let login = false;
    data.forEach(user => {
        if (user.email == email) {
            if (user.password == pass) {
                login = true
                local.id = user.id
                local.correo = user.email
                local.password = user.password
            }
        }
    });

    if (login) {
        localStorage.setItem("user", JSON.stringify(local))
        document.formulario.submit();
    } else {
        alert("Usuario o contraseña incorrectos")
        document.querySelector(".pass").value = ""
    }



}





form.addEventListener('submit', e => {
    e.preventDefault()
    validarUsuario()
        //document.formulario.submit();
})