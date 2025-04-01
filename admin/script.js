let lugares = JSON.parse(localStorage.getItem('lugares')) || [];
let indiceEditando = null;
// Guarda los datos en localStorage y actualiza la vista
function guardarDatos() {
  localStorage.setItem('lugares', JSON.stringify(lugares));
  mostrarLugares();
}

// Muestra los lugares en forma de tarjetas
function mostrarLugares() {
  const contenedor = document.getElementById('lista-lugares');
  contenedor.innerHTML = '';

  lugares.forEach((lugar, index) => {
    contenedor.innerHTML += `
      <div class="card">
        <h2>${lugar.nombre}</h2>
        <img src="${lugar.imagen}" alt="${lugar.nombre}">
        <p>${lugar.ficha}</p>
        <p>
          <a href="${lugar.web}" target="_blank">Sitio Web</a> |
          <a href="${lugar.mapa}" target="_blank">Ver Mapa</a>
        </p>
        <small>Filtro: ${lugar.filtro}</small><br><br>
        <button onclick="editarLugar(${index})">Editar</button>
        <button onclick="eliminarLugar(${index})">Eliminar</button>
      </div>
    `;
  });
}

// Carga los datos del lugar seleccionado en el formulario
function editarLugar(index) {
  const lugar = lugares[index];
  document.getElementById('nombre').value = lugar.nombre;
  document.getElementById('imagen').value = lugar.imagen;
  document.getElementById('ficha').value = lugar.ficha;
  document.getElementById('web').value = lugar.web;
  document.getElementById('mapa').value = lugar.mapa;
  document.getElementById('filtro').value = lugar.filtro;
  indiceEditando = index; // Guardamos el índice
}

// Elimina un lugar
function eliminarLugar(index) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el punto turístico.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      lugares.splice(index, 1);
      guardarDatos();
      Swal.fire('Eliminado', 'El punto fue eliminado correctamente.', 'success');
    }
  });
}

// Envía el formulario y agrega un nuevo lugar
document.getElementById('formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevoLugar = {
    nombre: document.getElementById('nombre').value,
    imagen: document.getElementById('imagen').value,
    ficha: document.getElementById('ficha').value,
    web: document.getElementById('web').value,
    mapa: document.getElementById('mapa').value,
    filtro: document.getElementById('filtro').value
  };

  // Mostrar vista previa en SweetAlert
  Swal.fire({
    title: `¿Agregar "${nuevoLugar.nombre}"?`,
    html: `
      <img src="${nuevoLugar.imagen}" alt="${nuevoLugar.nombre}" style="width:100%; max-height:200px; object-fit:cover; margin-bottom:10px; border-radius:8px;">
      <p><strong>Ficha:</strong> ${nuevoLugar.ficha}</p>
      <p><strong>Sitio Web:</strong> <a href="${nuevoLugar.web}" target="_blank">${nuevoLugar.web}</a></p>
      <p><strong>Mapa:</strong> <a href="${nuevoLugar.mapa}" target="_blank">${nuevoLugar.mapa}</a></p>
      <p><strong>Filtro:</strong> ${nuevoLugar.filtro}</p>
    `,
    showCancelButton: true,
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    width: '600px'
  }).then((result) => {
    if (result.isConfirmed) {
      if (indiceEditando !== null) {
        lugares[indiceEditando] = nuevoLugar;
        indiceEditando = null;
      } else {
        lugares.push(nuevoLugar);
      }
      
      guardarDatos();
      document.getElementById('formulario').reset();

      Swal.fire('Agregado', 'El lugar fue agregado correctamente.', 'success');
    }
  });
});

document.getElementById('archivo-json').addEventListener('change', function (event) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function (e) {
    try {
      const datos = JSON.parse(e.target.result);
      if (Array.isArray(datos)) {
        lugares = datos;
        guardarDatos();
        Swal.fire('Cargado', 'Los puntos turísticos se cargaron exitosamente.', 'success');
      } else {
        Swal.fire('Error', 'El archivo no contiene un arreglo válido.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'El archivo no es un JSON válido.', 'error');
    }
  };

  lector.readAsText(archivo);
});


function limpiarFormulario() {
  document.getElementById('formulario').reset();
  indiceEditando = null;
}


// Descarga los lugares como archivo JSON
function descargarJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lugares, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "lugares.json");
  dlAnchor.click();
}
function cerrarSesion() {
  localStorage.removeItem('logueado');
  window.location.href = '../inicio/index.html';
}


// Menú hamburguesa para móvil
function toggleMenu() {
  document.querySelector('.menu').classList.toggle('active');
}

// Mostrar datos al cargar
mostrarLugares();
