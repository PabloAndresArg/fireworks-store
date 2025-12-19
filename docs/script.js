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
  {
    id: 22,
    titulo: "Candelas",
    descripcion: "",
    precio: 6,
    precio_r: 5,
    imagen: "./assets/item22.jpeg"
  },
  {
    id: 23,
    titulo: "Rollo de ametralladora",
    descripcion: "",
    precio: 65,
    precio_r: 60,
    imagen: "./assets/item23.jpeg"
  }
];

// Cart state
let carrito = [];

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
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </div>
        `;
    contenedor.appendChild(productoElement);
  });
}

function agregarAlCarrito(id) {

  const producto = productos.find(p => p.id === id);
  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  actualizarCarrito();
  animarIconoCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad = nuevaCantidad;
    actualizarCarrito();
  }
}

function calcularTotal() {
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function actualizarCarrito() {
  const contadorElement = document.getElementById('carrito-contador');
  const carritoContainer = document.getElementById('carrito-items');
  const totalElement = document.getElementById('carrito-total');
  
  // Update counter (for main page)
  if (contadorElement) {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorElement.textContent = totalItems;

    // Hide counter if no items
    if (totalItems === 0) {
      contadorElement.style.display = 'none';
    } else {
      contadorElement.style.display = 'flex';
    }
  }
  
  // Update cart items (for cart page)
  if (carritoContainer) {
    carritoContainer.innerHTML = '';
    
    if (carrito.length === 0) {
      carritoContainer.innerHTML = '<div class="carrito-vacio"><h3>El carrito está vacío</h3><p>No hay productos en tu carrito</p></div>';
    } else {
      carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
          <div class="item-info">
            <h4>${item.titulo}</h4>
            <p>Q${item.precio.toFixed(2)} c/u</p>
          </div>
          <div class="item-cantidad">
            <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
            <span>${item.cantidad}</span>
            <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
          </div>
          <div class="item-subtotal">
            <p>Q${(item.precio * item.cantidad).toFixed(2)}</p>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
          </div>
        `;
        carritoContainer.appendChild(itemElement);
      });
    }
  }
  
  // Update total (for cart page)
  if (totalElement) {
    totalElement.textContent = `Q${calcularTotal().toFixed(2)}`;
  }
  
  // Save cart to localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function animarIconoCarrito() {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }
}

function goToCar() {
  // Navigate to cart page
  window.location.href = 'cart.html';
}

function volverTienda() {
  window.location.href = 'index.html';
}

function vaciarCarrito() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres vaciar el carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      actualizarCarrito();
      Swal.fire('¡Carrito vacío!', 'El carrito ha sido vaciado.', 'success');
    }
  });
}

// Load cart from localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

async function enviarOrden() {
    // Validar que todos los campos estén completos
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const fecha = document.getElementById('date').value;
    
    if (!nombre || !correo || !celular || !fecha) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos del cliente.'
        });
        return;
    }
    
    // Validar que hay items en el carrito
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito.'
        });
        return;
    }
    
    // Mostrar loading
    Swal.fire({
        title: 'Enviando orden...',
        text: 'Por favor espere mientras procesamos su orden.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Crear HTML formateado para el correo
    const itemsHtml = carrito.map(item => `
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${item.titulo}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.cantidad}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Q${item.precio.toFixed(2)}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Q${(item.precio * item.cantidad).toFixed(2)}</td>
        </tr>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    const htmlContent = `
        <h2 style="color: #333;">Nueva Orden de Fuegos Artificiales</h2>
        
        <h3 style="color: #555;">Información del Cliente:</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${celular}</p>
        <p><strong>Fecha requerida:</strong> ${fecha}</p>
        
        <h3 style="color: #555; margin-top: 30px;">Productos Ordenados:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Producto</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Cantidad</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: right;">Precio Unitario</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: right;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>
        
        <div style="margin-top: 20px; text-align: right;">
            <h3 style="color: #333; font-size: 24px;">Total: Q${total.toFixed(2)}</h3>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
            Esta orden fue generada automáticamente desde la tienda de fuegos artificiales.
        </p>
    `;
    
    // Use a simple POST without custom headers to avoid CORS preflight
    try {
        const response = await fetch('https://vixrjxscxyutnzazmczp.supabase.co/functions/v1/send-email---fireworks-', {
            method: 'POST',
            body: JSON.stringify({
                subject: `Nueva orden de ${nombre} - ${celular}`,
                html: htmlContent
            })
        });
        
        if (response.ok || response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Orden enviada!',
                text: 'Su orden ha sido enviada exitosamente.',
                confirmButtonText: 'Continuar'
            }).then(() => {
                // Limpiar carrito y formulario después del envío exitoso
                carrito = [];
                actualizarCarrito();
                document.getElementById('nombre').value = '';
                document.getElementById('correo').value = '';
                document.getElementById('celular').value = '';
                document.getElementById('date').value = '';
            });
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        console.error('Error al enviar la orden:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar',
            text: 'Hubo un problema al enviar la orden. Por favor, inténtelo de nuevo.'
        });
    }
}

// Renderizar los productos cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
  cargarCarrito();
  
  if (document.getElementById('productos-container')) {
    // Estamos en la página principal
    renderizarProductos();
  }
  
  actualizarCarrito();

  // Add click event to cart icon
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', goToCar);
  }
});

