const productos = [
    {
      id: 1,
      titulo: "Misil de 36 tiros",
      descripcion: "",
      precio: 20,
      imagen: "./assets/item1.jpeg"
    },
    {
      id: 2,
      titulo: "Batería de 19 disparos",
      descripcion: "",
      precio: 200,
      imagen: "./assets/item2.jpeg"
    },
    {
      id: 3,
      titulo: "Caja Volcán philicrackers",
      descripcion: "",
      precio: 35,
      precio_r: 30,
      imagen: "./assets/item3.jpeg"
    },
    {
      id: 4,
      titulo: "Super Tronadores",
      descripcion: "",
      precio: 25,
      imagen: "./assets/item4.jpeg"
    },
    {
      id: 5,
      titulo: "Pili Crackers",
      descripcion: "",
      precio: 20,
      imagen: "./assets/item5.jpeg"
    },
    {
      id: 6,
      titulo: "Barriles",
      descripcion: "",
      precio: 15,
      imagen: "./assets/item6.jpeg"
    },
    {
      id: 7,
      titulo: "Girasoles",
      descripcion: "",
      precio: 10,
      imagen: "./assets/item7.jpeg"
    },
    {
      id: 8,
      titulo: "Colita de Raton",
      descripcion: "",
      precio: 20,
      imagen: "./assets/item8.jpeg"
    },
    {
      id: 9,
      titulo: "Bateria de 19 tiros",
      descripcion: "",
      precio: 100,
      imagen: "./assets/item9.jpeg"
    },
    {
      id: 10,
      titulo: "Paquete de estrellitas",
      descripcion: "",
      precio: 20,
      imagen: "./assets/item10.jpeg"
    },
    {
      id: 11,
      titulo: "Volcan Grande",
      descripcion: "",
      precio: 20,
      imagen: "./assets/item11.jpeg"
    },
    {
      id: 12,
      titulo: "Palitos de chispas",
      descripcion: "",
      precio: 15,
      imagen: "./assets/item12.jpeg"
    },
    {
      id: 13,
      titulo: "Color smoke",
      descripcion: "",
      precio: 10,
      imagen: "./assets/item13.jpeg"
    },
    {
      id: 14,
      titulo: "Trompos",
      descripcion: "",
      precio: 10,
      imagen: "./assets/item14.jpeg"
    },
    {
      id: 15,
      titulo: "Mariposa",
      descripcion: "",
      precio: 22,
      precio_r: 20,
      imagen: "./assets/item15.jpeg"
    },
    {
      id: 16,
      titulo: "Estrillitas",
      descripcion: "",
      precio: 25,
      imagen: "./assets/item16.jpeg"
    },
    {
      id: 17,
      titulo: "Alegrias",
      descripcion: "",
      precio: 6,
      precio_r: 5,
      imagen: "./assets/item17.jpeg"
    },
    {
      id: 18,
      titulo: "Flores de fuego",
      descripcion: "",
      precio: 15,
      precio_r: 10,
      imagen: "./assets/item18.jpeg"
    },
    {
      id: 19,
      titulo: "Philicracker/diablios",
      descripcion: "",
      precio: 30,
      precio_r: 25,
      imagen: "./assets/item19.jpeg"
    },
    {
      id: 20,
      titulo: "Peonias y lloronas",
      descripcion: "",
      precio: 210,
      precio_r: 200,
      imagen: "./assets/item20.jpeg"
    },
    {
      id: 21,
      titulo: "Chiltepitos/diablos",
      descripcion: "",
      precio: 12,
      precio_r: 10,
      imagen: "./assets/item21.jpeg"
    },
    ,{
      id: 22,
      titulo: "Candelas",
      descripcion: "",
      precio: 6,
      precio_r: 5,
      imagen: "./assets/item22.jpeg"
    },
    ,{
      id: 23,
      titulo: "Rollo de ametralladora",
      descripcion: "",
      precio: 65,
      precio_r: 60,
      imagen: "./assets/item23.jpeg"
    }
  ];

function renderizarProductos() {
    const contenedor = document.getElementById('productos-container');
    
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-info">
                <h2 class="producto-titulo">${producto.titulo}</h2>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">Q${producto.precio.toFixed(2)}</p>
            </div>
        `;
        contenedor.appendChild(productoElement);
    });
}

function agregarAlCarrito(id) {
    // Aquí iría la lógica para agregar el producto al carrito
    console.log(`Producto con ID ${id} agregado al carrito`);
    alert(`Producto agregado al carrito`);
}

// Renderizar los productos cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderizarProductos);

