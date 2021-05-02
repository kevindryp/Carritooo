const fragmentComplete = document.createDocumentFragment()
const fragmmentCard1 = document.createDocumentFragment()
const fragmmentCard2 = document.createDocumentFragment()
const fragmmentCarritoMain = document.createDocumentFragment()
const fraggmentCarritoData = document.createDocumentFragment()
const carrito_table = document.createElement("table")
carrito_table.classList.add("table")
carrito_table.setAttribute("id", "table")
carrito_table.insertAdjacentHTML("beforeend", `
<thead>
    <tr>
        <th scope="col">id</th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Aumentar/Disminuir</th>
        <th scope="col">Precio Unitario</th>
        <th scope="col">Precio Neto</th>
        <th scope="col">IVA</th>
        <th scope="col">Precio Total</th>
        
    </tr>
</thead>`)
const h1_car = document.createElement("h2")
h1_car.textContent = "Carrito de compras"

fragmmentCarritoMain.appendChild(h1_car)
fragmmentCarritoMain.appendChild(carrito_table)
const car = document.getElementById("carrito")
const carrito_total = document.createDocumentFragment()


const row1 = document.createElement("div")
row1.classList.add("row")
row1.classList.add("p-5")
const row2 = document.createElement("div")
row2.classList.add("row")
row2.classList.add("p-5")
let carrito = {}

const nav = document.querySelector(".navegacion")
nav.insertAdjacentHTML("beforeend", `
<form action="index.html" name="formularioLog" class="formLog">  
<button class="boton_log">Logout</button>
</form>
`)

document.querySelector(".formLog").addEventListener('submit', e => {
    e.preventDefault()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    document.formularioLog.submit()
})



document.addEventListener('DOMContentLoaded', () => {
    traerProductos()
    if (localStorage.getItem("carro_compras")) {
        carrito = JSON.parse(localStorage.getItem("carro_compras"))
        drawCarrito()
    }



})


const traerProductos = async() => {
    const response = await fetch('http://ec2-3-143-209-122.us-east-2.compute.amazonaws.com:8000/Productos/', { method: 'GET', mode: 'cors' })
    const data = await response.json()
    drawCards(data)
}

const drawCards = data => {
    let i = 0;
    data.forEach(card => {
        if (i < 3) {
            const c = document.createElement("div")
            c.classList.add("col-sm")
            c.insertAdjacentHTML("beforeend", `
            <div class="card" style="width: 30rem;height: 31em;">
                <img src="${card.imageUrl}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                 <h5 class="card-title h2">${card.title}</h5>
                 <p class="card-text">${card.description}</p>
                 <p class="card-text"><span class="precio">${card.price}</span> Pesos, sin iva</p>
                 <button class="btn btn-primary boton" id="${card.id}">Añadir al carrito</button>
                </div>
            </div>
            `)
            fragmmentCard1.appendChild(c)
            i++;
        } else {
            const c = document.createElement("div")
            c.classList.add("col-sm")
            c.insertAdjacentHTML("beforeend", `
            <div class="card" style="width: 30rem;height: 31em;">
                <img src="${card.imageUrl}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                 <h5 class="card-title h2">${card.title}</h5>
                 <p class="card-text">${card.description}</p>
                 <p class="card-text"><span class="precio">${card.price}</span> Pesos, sin iva</p>
                 <button class="btn btn-primary boton" id="${card.id}">Añadir al carrito</button>
                </div>
            </div>
            `)
            fragmmentCard2.appendChild(c)

        }

    });
    row1.appendChild(fragmmentCard1)
    row2.appendChild(fragmmentCard2)
    fragmentComplete.appendChild(row1)
    fragmentComplete.appendChild(row2)

    const contenido = document.getElementById("contenido")
    contenido.appendChild(fragmentComplete)

    eventos_botones()
}

const eventos_botones = () => {
    const botones = document.querySelectorAll(".boton")
    botones.forEach(boton => {
        boton.addEventListener('click', e => {
            añadirProducto(e)
        })
    });

}

const añadirProducto = e => {
    cambiarCarritoAñadir(e.target.parentElement)
    e.stopPropagation()
}

const cambiarCarritoAñadir = obj => {
    const producto = {
        id: obj.querySelector(".boton").getAttribute("id"),
        title: obj.querySelector(".card-title").textContent,
        price: obj.querySelector(".precio").textContent,
        amount: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.amount = carrito[producto.id].amount + 1
    }
    carrito[producto.id] = {...producto }
    drawCarrito()
}

//-------------------------------------------------------------------------
const añadirProductoBt = e => {
    cambiarCarritoAgregarBt(e.target.parentElement.parentElement)
    e.stopPropagation()
}

const cambiarCarritoAgregarBt = obj => {
    if (parseInt(obj.querySelector("#cantidad").textContent) === 0) {
        const producto1 = {
            id: obj.querySelector("th").textContent,
            title: obj.querySelector("#titulo").textContent,
            price: obj.querySelector("#price").textContent,
            amount: 1
        }
        carrito[producto1.id] = {...producto1 }
        drawCarrito()
    } else {
        const producto2 = {
            id: obj.querySelector("th").textContent,
            title: obj.querySelector("#titulo").textContent,
            price: obj.querySelector("#price").textContent,
            amount: parseInt(obj.querySelector("#cantidad").textContent) + 1
        }
        carrito[producto2.id] = {...producto2 }
        drawCarrito()
    }
}

//-----------------------------------------------------------------------

const quitarProducto = e => {
    cambiarCarritoQuitar(e.target.parentElement.parentElement)
    e.stopPropagation()
}

const cambiarCarritoQuitar = obj => {
    if (parseInt(obj.querySelector("#cantidad").textContent) === 0) {
        const producto1 = {
            id: obj.querySelector("th").textContent,
            title: obj.querySelector("#titulo").textContent,
            price: obj.querySelector("#price").textContent,
            amount: 0
        }
        delete carrito[producto1.id]
        drawCarrito()
    } else {
        const producto2 = {
            id: obj.querySelector("th").textContent,
            title: obj.querySelector("#titulo").textContent,
            price: obj.querySelector("#price").textContent,
            amount: parseInt(obj.querySelector("#cantidad").textContent) - 1
        }

        if (producto2.amount == 0) {
            delete carrito[producto2.id]
            drawCarrito()
        } else {


            carrito[producto2.id] = {...producto2 }
            drawCarrito()
        }
    }
}

//-------------------------------------------------------------------------------

const drawCarrito = () => {
    let precioNetoTotal = 0
    let precioTotal = 0
    let ivaTotal = 0
    if (Object.keys(carrito).length != 0) {
        let oldchild = carrito_table.firstElementChild.nextElementSibling
        const carrito_data = document.createElement("tbody")
        carrito_data.setAttribute("id", "data_table")
        if (Object.keys(carrito) != 0) {

            for (producto in carrito) {
                const p = document.createElement("tr")
                p.insertAdjacentHTML("beforeend", `
            <th scope="row" id="ide">${carrito[producto].id}</th>
            <td id="titulo">${carrito[producto].title}</td>
            <td id="cantidad">${carrito[producto].amount}</td>
            <td>
            <button class="boton_au" id="${carrito[producto].id}">+</button>
            <button class="boton_di id="${carrito[producto].id}">-</button>
            </td>
            <td id="price">${carrito[producto].price}</td>
            <td>${parseInt(carrito[producto].price)*parseInt(carrito[producto].amount)}</td>
            <td>${(parseInt(carrito[producto].price)*parseInt(carrito[producto].amount))*0.19}</td>
            <td>${(parseInt(carrito[producto].price)*parseInt(carrito[producto].amount))+(parseInt(carrito[producto].price)*parseInt(carrito[producto].amount))*0.19}</td>
            `)
                carrito_data.appendChild(p)
                precioNetoTotal += parseInt(carrito[producto].price) * parseInt(carrito[producto].amount)
                ivaTotal += (parseInt(carrito[producto].price) * parseInt(carrito[producto].amount)) * 0.19
                precioTotal += (parseInt(carrito[producto].price) * parseInt(carrito[producto].amount)) + (parseInt(carrito[producto].price) * parseInt(carrito[producto].amount)) * 0.19
            }
            let oldchild = carrito_table.firstElementChild.nextElementSibling
            const total = document.createElement("tr")
            total.insertAdjacentHTML("beforeend", `
            <th scope="row" id="ide"></th>
            <td id="titulo">TOTAL A PAGAR</td>
            <td id="cantidad"></td>
            <td><button class="boton_pag" id="pagar" onclick="evento_pagar()" name="boton_pagar">Pagar</button></td>
            <td id="price"></td>
            <td>${precioNetoTotal}</td>
            <td>${ivaTotal}</td>
            <td>${precioTotal}</td>
            `)
            if (oldchild != null) {
                carrito_table.removeChild(carrito_table.lastElementChild)
                carrito_table.removeChild(carrito_table.firstElementChild.nextElementSibling)
                carrito_table.appendChild(carrito_data)
                carrito_table.appendChild(total)
            } else {
                carrito_table.appendChild(carrito_data)
                carrito_table.appendChild(total)
            }


            car.appendChild(fragmmentCarritoMain)
            car.style.display = "block"

            eventos_botones_carrito()
        }
    } else {
        car.style.display = "none"
    }

    localStorage.setItem("carro_compras", JSON.stringify(carrito))
}


const eventos_botones_carrito = () => {
    const boton_añadir = document.querySelectorAll(".boton_au")
    boton_añadir.forEach(boton => {
        boton.addEventListener('click', e => {
            añadirProductoBt(e)
        })
    });
    const boton_disminuir = document.querySelectorAll(".boton_di")
    boton_disminuir.forEach(boton => {
        boton.addEventListener('click', e => {
            quitarProducto(e)
        })
    });
}

const evento_pagar = async() => {
    const compra = JSON.parse(localStorage.getItem("carro_compras"))
    let cantidad = 0
    let costo = 0
    for (producto in compra) {
        cantidad += parseInt(compra[producto].amount)
        costo += (parseInt(compra[producto].amount) * parseInt(compra[producto].price)) * 1.19
    }


    fecha = new Date()
    format = fecha.getFullYear() + "-"
    if (parseInt(fecha.getMonth()) < 10) {
        format += "0" + fecha.getMonth() + "-"
    } else {
        format += fecha.getMonth() + "-"
    }
    if (parseInt(fecha.getDate()) < 10) {
        format += "0" + fecha.getDate()
    } else {
        format += fecha.getDate()
    }


    var formdata = new FormData();
    formdata.append("cantidad", cantidad);
    formdata.append("fecha", format);
    formdata.append("costo", costo);
    formdata.append("cliente", JSON.parse(localStorage.getItem("user")).id);


    var options = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    console.log(options)
    const response = await fetch('http://ec2-3-143-209-122.us-east-2.compute.amazonaws.com:8000/Ventas/', options)
    const data = await response.json()
    console.log(data)


}