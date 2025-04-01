let lugares = JSON.parse(localStorage.getItem('lugares')) || [];

function guardarDatos() {
  localStorage.setItem('lugares', JSON.stringify(lugares));
  mostrarLugares();
}

function mostrarLugares() {
  const contenedor = document.getElementById('lista-lugares');
  contenedor.innerHTML = '';

  lugares.forEach((lugar, index) => {
    contenedor.innerHTML += `
      <div class="lugar">
        <h3>${lugar.nombre}</h3>
        <img src="${lugar.imagen}" width="100">
        <p>${lugar.ficha}</p>
        <a href="${lugar.web}" target="_blank">Sitio Web</a> | 
        <a href="${lugar.mapa}" target="_blank">Ver Mapa</a><br>
        <small>Filtro: ${lugar.filtro}</small><br>
        <button onclick="editarLugar(${index})">Editar</button>
        <button onclick="eliminarLugar(${index})">Eliminar</button>
      </div>
      <hr>
    `;
  });
}

function editarLugar(index) {
  const lugar = lugares[index];
  document.getElementById('nombre').value = lugar.nombre;
  document.getElementById('imagen').value = lugar.imagen;
  document.getElementById('ficha').value = lugar.ficha;
  document.getElementById('web').value = lugar.web;
  document.getElementById('mapa').value = lugar.mapa;
  document.getElementById('filtro').value = lugar.filtro;

  lugares.splice(index, 1);
  guardarDatos();
}

function eliminarLugar(index) {
  lugares.splice(index, 1);
  guardarDatos();
}

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

  lugares.push(nuevoLugar);
  guardarDatos();
  this.reset();
});

function descargarJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lugares, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "lugares.json");
  dlAnchor.click();
}

// Cargar al inicio
mostrarLugares();
