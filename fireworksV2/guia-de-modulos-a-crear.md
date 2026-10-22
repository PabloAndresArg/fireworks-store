# Análisis de módulos del software

## Resumen general


El sistema está compuesto por 5 módulos funcionales principales y 2 integraciones externas (servicios backend en Supabase).

---

## 1) Módulo de tienda / catálogo

### Funcionalidades
- Carga un listado de productos definido en un arreglo JavaScript.
- Renderiza cada producto en la vista principal.
- Muestra información como:
  - nombre
  - descripción
  - precio
  - imagen
  - opción de video
- Permite modificar la cantidad de cada producto antes de agregarlo al carrito.
- Muestra el número total de artículos en el carrito mediante un contador visual.

### Objetivo
Presentar el catálogo para que el cliente explore los productos y los agregue a su compra.

---

## 2) Módulo de carrito de compras


### Funcionalidades
- Añadir productos al carrito.
- Eliminar productos individualmente.
- Cambiar cantidades desde el carrito.
- Calcular subtotal.
- Calcular total con cargo de envío fijo.
- Guardar el estado del carrito en `localStorage`.
- Determinar si el carrito está vacío o no.
- Mostrar resumen de compra con cantidades y totales.

### Objetivo
Gestionar la compra del cliente de manera local en el navegador, sin backend propio.

---

## 3) Módulo de checkout / formulario del cliente



### Funcionalidades
- Captura los datos del cliente:
  - nombre completo
  - número de celular
  - fecha requerida
  - correo electronico
- Valida que todos los campos estén completos.
- Verifica que el carrito no esté vacío.
- Aplica validación de monto mínimo requerido para procesar una orden.
- Prepara la información para enviarla al siguiente paso de la compra.

### Objetivo
Reunir la información necesaria para generar una orden real de compra.

---

## 4) Módulo de generación de orden



### Funcionalidades
- Construye el detalle final de la compra en formato HTML.
- Muestra la información del cliente.
- Lista cada producto con:
  - nombre
  - cantidad
  - precio de venta
  - precio de costo
  - subtotal de venta
  - subtotal de costo
- Calcula:
  - subtotal
  - envío
  - total a cobrar
  - total costo
  - ganancia
- Genera la orden para enviarla a un servicio externo.
- se le mostrara un mensaje al usuario que solo será procesada la orden si lo confirma desde su correo.
- Muestra mensajes de éxito o error al usuario con SweetAlert2.

### Objetivo
Transformar la compra en una orden formal para ser procesada y enviada.




## Integraciones externas

### 1) Servicio de envío de email
- Endpoint: `https://vixrjxscxyutnzazmczp.supabase.co/functions/v1/send-email---fireworks-`
- Función:
  - recibe la información de la orden
  - prepara un correo HTML
  - lo envía a un destinatario o proceso configurado


---

## Resumen breve:

"Proyecto web para tienda de venta de fuegos artificiales "CUETESYA" Tiene 4 módulos principales: catálogo de productos, carrito de compras, checkout, y generación de orden. La lógica del negocio está del lado del cliente y se guarda el estado localmente en `localStorage`; la orden y el pago se procesan a través de funciones serverless externas en Supabase. La migración debe conservar las funcionalidades de compra, validación, cálculo de precios, generación del pedido."

---

## Conclusión

primero catálogo y carrito, luego checkout y lógica de orden, y finalmente integración de email.
