let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productosGlobal = [];

// Detectar si estamos en index.html
const contenedorProductos = document.getElementById('productos');
if (contenedorProductos) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(productos => {
      productosGlobal = productos;
      renderizarProductos(productos);
    });
};

function renderizarProductos(productos) {
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <h3>${producto.title}</h3>
      <img src="${producto.image}" alt="${producto.title}">
      <p>$${producto.price}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
};

function agregarAlCarrito(id) {
  const producto = productosGlobal.find(p => p.id === id);
  const index = carrito.findIndex(item => item.id === id);

  if (index === -1) {
    carrito.push({ ...producto, cantidad: 1 });
  } else {
    carrito[index].cantidad++;
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert("Producto agregado al carrito");
};

// Carrito.html
function renderizarCarrito() {
  const contenedor = document.getElementById('carrito');
  const totalElemento = document.getElementById('total');
//   if (!contenedor || !totalElemento) return;

   contenedor.innerHTML = '';
   let total = 0;
   if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío 🛒</p>';
    totalElemento.textContent = '';
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.price * item.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.classList.add('item-carrito');

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="item-info">
        <p><strong>${item.title}</strong></p>
        <p>Precio: $${item.price.toFixed(2)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
      </div>
      <button onclick="eliminarDelCarrito(${item.id})">🗑</button>
    `;

    contenedor.appendChild(div);
  });

  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
};

// function eliminarDelCarrito(id) {
//   carrito = carrito.filter(item => item.id !== id);
//   localStorage.setItem('carrito', JSON.stringify(carrito));
//   renderizarCarrito();
// }
window.eliminarDelCarrito = function(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
};

// Ejecutar al cargar carrito.html
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  const btnVaciar = document.getElementById('vaciar-carrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      const confirmar = confirm("¿Estás seguro de vaciar el carrito?");
      if (confirmar) {
        localStorage.removeItem('carrito');
        carrito = [];
        renderizarCarrito();
      }
    });
  }
});


