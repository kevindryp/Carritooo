const form = document.querySelector(".form")
form.addEventListener("submit", e => {
    e.preventDefault()
    var newUser = new FormData();
    newUser.append("nombre", document.getElementById("name").value);
    newUser.append("direccion", document.getElementById("direccion").value);
    newUser.append("email", document.getElementById("mail").value);
    newUser.append("telefono", parseInt(document.getElementById("phone").value));
    newUser.append("password", document.getElementById("passw").value);
    register(newUser)

})

const register = async(user) => {
    var options = {
        method: 'POST',
        body: user,
        redirect: 'follow'
    };

    const response = await fetch('http://ec2-3-143-209-122.us-east-2.compute.amazonaws.com:8000/Clientes/', options)
    const data = await response.json()
    window.location.href = "login.html"

}