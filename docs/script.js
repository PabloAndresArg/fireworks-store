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
      titulo: "Volcán philicrackers",
      descripcion: "",
      precio: 14.99,
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
      titulo: "Bateria de 3 luces",
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
      precio: 20,
      imagen: "./assets/item15.jpeg"
    },
    {
      id: 16,
      titulo: "Estrillitas",
      descripcion: "",
      precio: 25,
      imagen: "./assets/item16.jpeg"
    },
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

