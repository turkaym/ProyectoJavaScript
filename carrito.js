const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")


/* ARRAY DE PRODUCTOS*/

const productos = [
    {id: 1, nombre:"Nuez", precio: 13000, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVeIfSyPCU871Kl1Yk4iAtLzX4TOYQSzFA&s", cantidad: 1 },
    {id: 2, nombre:"Almendra", precio: 18000, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaltyLIvpWmQ--3RccpZYdwZIth1qiBmVCPA&s", cantidad: 1},
    {id: 3, nombre:"Castañas", precio: 18000, img: "https://cdn.newgarden.com.ar/media/catalog/product/cache/f1e87191ad4fbadc602f34ed83daeecc/c/a/castanas-de-caju-tostadas-sin-sal-1kg-sin-gluten.jpg", cantidad: 1},
    {id: 4, nombre:"Pistachos", precio: 24000, img: "https://supermercado.eroski.es/images/22307896_3.jpg", cantidad: 1},
]

     let carrito = JSON.parse(localStorage.getItem("carrito")) || []

/* FUNCION DE ORDEN SUPERIOR METODO FOREACH PARA RECORRER EL PRODUCTO */



productos.forEach((product) => {
    let content = document.createElement("div");
    content.className ="card"
    content.innerHTML = ` <h3>${product.nombre}</h3>
                          <p class="price">${product.precio} $</p>
                          <img src="${product.img}" $>`

    shopContent.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className = "comprar"

    content.append(comprar)

    comprar.addEventListener("click", () =>{   
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)    
        console.log(repeat)
        
        if (repeat) {
            carrito.map ((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++
                }
            })
        }else{  
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
         })
        
        console.log(carrito)
        console.log(carrito.length)
        carritoCounter()
        saveLocal()
       }
    })
})
    
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}




const pintarCarrito = () => {
    modalContainer.innerHTML = 
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className ="modal-header"
    modalHeader.innerHTML = `<h1 class="modal-header-title">Carrito.</h1>
    `
    modalContainer.append(modalHeader)

    const modalbutton = document.createElement("h1")
    modalbutton.innerText = "x"
    modalbutton.className = "modal-header-button"

    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalbutton)

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content" 
        carritoContent.innerHTML = `<img src ="${product.img}">
                                    <h3>${product.nombre}</h3>
                                    <p>${product.precio} $</p>  
                                    <span class= "restar"> - </span>
                                    <p>Cantidad: ${product.cantidad}</p> 
                                    <span class= "sumar"> + </span>
                                    <p>Total: ${product.cantidad * product.precio}</p>`
     
                          
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
            product.cantidad--
            }
            pintarCarrito()
            saveLocal()
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
            product.cantidad++
            saveLocal()
            pintarCarrito()
        })
      
         
    
        let eliminar = document.createElement("span")
        eliminar.innerText = "❌"
        eliminar.className = "delete-product"
        carritoContent.append(eliminar)
    
        eliminar.addEventListener("click", eliminarProducto)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`
    modalContainer.append(totalBuying)
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = () => {
    const foundId =  carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    })
    carritoCounter()
    saveLocal()
    pintarCarrito()
}


const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLenght = carrito.length
    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"))
}

carritoCounter();








