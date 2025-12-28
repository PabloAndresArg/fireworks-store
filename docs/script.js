const productos = [
  {
    id: 1,
    titulo: "Misil de 36 tiros",
    descripcion: "Espectacular batería de 36 disparos consecutivos con efectos multicolor y destellos dorados. Ideal para celebraciones grandes.",
    precio: 40,
    precio_r: 40,
    imagen: "./assets/item1.jpeg"
  },
  {
    id: 3,
    titulo: "Caja Volcán philicrackers",
    descripcion: "Volcán de fuegos artificiales con efectos de crackers y chispas doradas. Perfecto para crear ambiente festivo.",
    precio: 35,
    precio_r: 30,
    imagen: "./assets/item3.jpeg"
  },
  {
    id: 4,
    titulo: "Super Tronadores",
    descripcion: "Bolsita de Potentes petardos con sonido intenso y efectos de luz. Ideales para llamar la atención en cualquier celebración.",
    precio: 30,
    precio_r: 25,
    imagen: "./assets/item4.jpeg"
  },
  {
    id: 6,
    titulo: "Barriles",
    descripcion: "Barril con efectos de lluvia dorada y colores vibrantes. Duración prolongada.",
    precio: 30,
    precio_r: 25,
    imagen: "./assets/item6.jpeg"
  },
  {
    id: 7,
    titulo: "Girasoles",
    descripcion: "Caja de Girasoles con hermosos efectos giratorios con chispas doradas y verdes. Perfectos para decoración.",
    precio: 10,
    precio_r: 10,
    imagen: "./assets/item7.jpeg"
  },
  {
    id: 8,
    titulo: "Colita de Raton",
    descripcion: "Clásicos fuegos artificiales con efecto serpenteante y chispas plateadas. Diversión garantizada para toda la familia.",
    precio: 20,
    precio_r: 20,
    imagen: "./assets/item8.jpeg"
  },
  {
    id: 9,
    titulo: "Bateria de 19 tiros",
    descripcion: "Impresionante batería de 19 disparos con efectos variados: palmeras, crisantemos y efectos multicolor en secuencia.",
    precio: 100,
    precio_r: 100,
    imagen: "./assets/item9.jpeg"
  },
  {
    id: 10,
    titulo: "Paquete de estrellitas",
    descripcion: "Conjunto de bengalas manuales que crean hermosas chispas plateadas. Perfectas para fotos y momentos especiales.",
    precio: 25,
    precio_r: 20,
    imagen: "./assets/item10.jpeg"
  },
  {
    id: 11,
    titulo: "Volcan Grande",
    descripcion: "Volcán de gran tamaño con efectos continuos de chispas doradas y plateadas. Espectáculo visual impresionante.",
    precio: 20,
    precio_r: 20,
    imagen: "./assets/item11.jpeg"
  },
  {
    id: 12,
    titulo: "Palitos de chispas",
    descripcion: "Bengalas tradicionales de mano con chispas doradas brillantes. Ideales para niños y celebraciones íntimas.",
    precio: 15,
    precio_r: 20,
    imagen: "./assets/item12.jpeg"
  },
  {
    id: 13,
    titulo: "Color smoke",
    descripcion: "Bomba de humo colorido disponible en varios colores vibrantes. Perfecta para efectos fotográficos y celebraciones.",
    precio: 12.50,
    precio_r: 10,
    imagen: "./assets/item13.jpeg"
  },
  {
    id: 14,
    titulo: "Trompos",
    descripcion: "Fuegos artificiales giratorios que crean patrones circulares de chispas multicolor mientras giran sobre el suelo.",
    precio: 12.5,
    precio_r: 10,
    imagen: "./assets/item14.jpeg"
  },
  {
    id: 15,
    titulo: "Mariposa",
    descripcion: "Elegantes fuegos artificiales con efectos que imitan el vuelo de mariposas con chispas doradas y plateadas.",
    precio: 25,
    precio_r: 20,
    imagen: "./assets/item15.jpeg"
  },
  {
    id: 16,
    titulo: "Estrillitas Gigantes",
    descripcion: "Bengalas de gran tamaño con duración extendida y chispas extra brillantes. Perfectas para grandes celebraciones.",
    precio: 30,
    precio_r: 25,
    imagen: "./assets/item16.jpeg"
  },
  {
    id: 17,
    titulo: "Alegrias",
    descripcion: "Pequeños fuegos artificiales con efectos alegres de chispas multicolor. Ideales para crear ambiente festivo.",
    precio: 6,
    precio_r: 5,
    imagen: "./assets/item17.jpeg"
  },
  {
    id: 18,
    titulo: "Flores de fuego",
    descripcion: "Hermosos efectos florales con pétalos de chispas que se abren como flores reales. Espectáculo romántico y elegante.",
    precio: 15,
    precio_r: 10,
    imagen: "./assets/item18.jpeg"
  },
  {
    id: 19,
    titulo: "Philicracker/diablios",
    descripcion: "Potentes crackers con sonidos explosivos intensos y destellos brillantes. Para quienes buscan máximo impacto.",
    precio: 30,
    precio_r: 25,
    imagen: "./assets/item19.jpeg"
  },
  {
    id: 20,
    titulo: "Peonias",
    descripcion: "Espectaculares efectos aéreos tipo peonía con explosiones esféricas perfectas y colores vibrantes que llenan el cielo.",
    precio: 240,
    precio_r: 200,
    imagen: "./assets/item20.jpeg",
    video: "https://vm.tiktok.com/ZMDNmJ6pH/"
  },
  {
    id: 21,
    titulo: "Chiltepitos/diablos",
    descripcion: "Bolsita de Pequeños chiltepitos pero potentes petardos con sonido característico. Perfectos para crear ambiente de fiesta tradicional.",
    precio: 12,
    precio_r: 10,
    imagen: "./assets/item21.jpeg"
  },
  {
    id: 22,
    titulo: "Candelas",
    descripcion: "Fuegos artificiales tipo vela con llama constante y efectos de chispas doradas. Ideales para ceremonias especiales.",
    precio: 6,
    precio_r: 5,
    imagen: "./assets/item22.jpeg"
  },
  {
    id: 23,
    titulo: "Rollo de ametralladora 10 mts",
    descripcion: "Secuencia continua de pequeñas explosiones que imitan el sonido de ametralladora. Efecto sonoro impresionante.",
    precio: 65,
    precio_r: 60,
    imagen: "./assets/item23.jpeg"
  },
  {
    id: 24,
    titulo: "Misil Cracker de 25 tiros",
    descripcion: "Batería de 25 misiles con efectos cracker y sonidos explosivos. Combinación perfecta de luz y sonido.",
    precio: 30,
    precio_r: 25,
    imagen: "./assets/item24.jpeg"
  },
  {
    id: 25,
    titulo: "Varita de 80 tiros",
    descripcion: "Impresionante varita con 80 disparos consecutivos de efectos variados. El más espectacular de nuestra colección.",
    precio: 25,
    precio_r: 20,
    imagen: "./assets/item25.jpeg"
  },
  {
    id: 26,
    titulo: "Lorronas",
    descripcion: "Fuegos artificiales con efectos de lluvia dorada que caen como lágrimas brillantes. Espectáculo emotivo y hermoso.",
    precio: 240,
    precio_r: 200,
    imagen: "./assets/item20.jpeg",
    video: "https://www.tiktok.com/@fuegosartificiales_peru/video/7451757845730675973"
  },
  {
    id: 27,
    titulo: "Misil de 49 tiros",
    descripcion: "Batería profesional de 49 disparos con efectos premium multicolor. Para celebraciones que requieren máximo espectáculo.",
    precio: 50,
    precio_r: 50,
    imagen: "./assets/item1.jpeg"
  },
  {
    id: 28,
    titulo: "6 estrellitas pequeñas",
    descripcion: "Pack de 6 bengalas pequeñas perfectas para niños y celebraciones íntimas. Seguras y fáciles de usar.",
    precio: 25,
    precio_r: 25,
    imagen: "./assets/item27.jpeg"
  },
];

// Cart state
let carrito = [];

function renderizarProductos() {
  const contenedor = document.getElementById('productos-container');

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.className = 'producto';

    // Get current quantity for this product
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    // Check if product has video
    const videoButton = producto.video ? `
      <button class="btn-video" onclick="abrirVideo('${producto.video}')">
        🎬 Ver Video
      </button>
    ` : '';

    productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-info">
                <h2 class="producto-titulo">${producto.titulo}</h2>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">Q${producto.precio.toFixed(2)}</p>
                ${videoButton}
                <div class="producto-cantidad">
                    <button class="btn-cantidad" onclick="cambiarCantidadProducto(${producto.id}, -1)">-</button>
                    <span class="cantidad-display" id="cantidad-${producto.id}">${cantidadActual}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidadProducto(${producto.id}, 1)">+</button>
                </div>
            </div>
        `;
    contenedor.appendChild(productoElement);
  });
}

function abrirVideo(videoUrl) {
  window.open(videoUrl, '_blank');
}

function cambiarCantidadProducto(id, cambio) {
  const itemExistente = carrito.find(item => item.id === id);
  const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
  const nuevaCantidad = cantidadActual + cambio;

  if (nuevaCantidad <= 0) {
    // Remove from cart if quantity becomes 0 or less
    carrito = carrito.filter(item => item.id !== id);
  } else {
    if (itemExistente) {
      itemExistente.cantidad = nuevaCantidad;
    } else {
      // Add new item to cart
      const producto = productos.find(p => p.id === id);
      carrito.push({
        ...producto,
        cantidad: nuevaCantidad
      });
    }
  }

  // Update the display for this specific product
  const cantidadDisplay = document.getElementById(`cantidad-${id}`);
  if (cantidadDisplay) {
    cantidadDisplay.textContent = Math.max(0, nuevaCantidad);
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
  const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const envio = 30; // Costo fijo de envío
  return subtotal + envio;
}

function calcularSubtotal() {
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function actualizarCarrito() {
  const contadorElement = document.getElementById('carrito-contador');
  const carritoContainer = document.getElementById('carrito-items');
  const totalElement = document.getElementById('carrito-total');
  const subtotalElement = document.getElementById('carrito-subtotal');

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

  // Update quantity displays on main page
  productos.forEach(producto => {
    const cantidadDisplay = document.getElementById(`cantidad-${producto.id}`);
    if (cantidadDisplay) {
      const itemEnCarrito = carrito.find(item => item.id === producto.id);
      const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
      cantidadDisplay.textContent = cantidadActual;
    }
  });

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

  // Calculate subtotal and total
  const subtotal = calcularSubtotal();
  const total = calcularTotal();

  // Update subtotal (for cart page)
  if (subtotalElement) {
    subtotalElement.textContent = `Q${subtotal.toFixed(2)}`;
  }

  // Update total (for cart page)
  if (totalElement) {
    totalElement.textContent = `Q${total.toFixed(2)}`;
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

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

async function enviarOrden() {
  const nombre = document.getElementById('nombre').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const fecha = document.getElementById('date').value;

  if (!nombre  || !celular || !fecha) {
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, complete todos los campos del cliente.'
    });
    return;
  }

  if (carrito.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'No hay productos en el carrito.'
    });
    return;
  }

  const total = calcularTotal();
  if (total < 200) {
    Swal.fire({
      icon: 'warning',
      title: 'Monto mínimo requerido',
      text: `El monto mínimo para realizar un pedido es de Q200. Tu pedido actual es de Q${total.toFixed(2)}.`,
      confirmButtonText: 'Entendido'
    });
    return;
  }

  Swal.fire({
    title: 'Enviando orden...',
    text: 'Por favor espere mientras procesamos su orden.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  const itemsHtml = carrito.map(item => `
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${item.titulo}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.cantidad}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Q${item.precio.toFixed(2)}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Q${(item.precio * item.cantidad).toFixed(2)}</td>
        </tr>
    `).join('');

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
        
        <div style="margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-top: 2px solid #333;">
                    <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 20px;">Total:</td>
                    <td style="padding: 15px; text-align: right; font-size: 24px; font-weight: bold; color: #c41e3a;">Q${total.toFixed(2)}</td>
                </tr>
            </table>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
            Esta orden fue generada automáticamente desde la tienda de fuegos artificiales.
        </p>
    `;

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
        title: '¡Orden enviada Exitosamente!',
        text: 'Nos pondremos en contacto contigo pronto.',
        confirmButtonText: 'Continuar'
      }).then(() => {
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

document.addEventListener('DOMContentLoaded', function () {
  cargarCarrito();

  if (document.getElementById('productos-container')) {
    renderizarProductos();
  }

  actualizarCarrito();

  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', goToCar);
  }
});

