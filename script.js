// Función para mostrar el modal "Acerca de" con la tabla
function mostrarAcercaDe() {
    Swal.fire({
        title: 'Acerca de',
        html: `
            <table>
                <tr>
                    <th>Carnet</th>
                    <th>Nombre</th>
                </tr>
                <tr>
                    <td>201408507</td>
                    <td>Jose Martinez</td>
                </tr>
                <tr>
                    <td>202002940</td>
                    <td>Sebastian Godoy</td>
                </tr>
                <tr>
                    <td>201019694</td>
                    <td>Henderson Baten</td>
                </tr>
            </table>
        `,
        confirmButtonText: 'Cerrar',
        width: '600px',
        padding: '20px',
        background: '#f4f4f9'
    });
}


function toggleMenu() {
    document.querySelector('.menu').classList.toggle('active');
}


// Función para mostrar el modal de inicio de sesión
function mostrarLogin() {
    
    Swal.fire({
        title: 'Inicio de sesión',
        html: `
            <input type="text" id="usuario" class="swal2-input" placeholder="Usuario">
            <input type="password" id="contraseña" class="swal2-input" placeholder="Contraseña">
        `,
        confirmButtonText: 'Iniciar sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const usuario = document.getElementById('usuario').value;
            const contraseña = document.getElementById('contraseña').value;
            
            // Verificar usuario y contraseña
            if (usuario === 'ia1' && contraseña === '2025') {
                // Si son correctos, redirigir a la página de admin
                window.location.href = './admin/index.html';
            } else {
                Swal.showValidationMessage('Usuario o contraseña incorrectos');
            }
        }
    });
}
