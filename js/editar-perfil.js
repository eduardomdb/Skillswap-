document.addEventListener("DOMContentLoaded", () => {
  // 1. Buscamos el usuario activo de forma segura
  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

  // Si no hay sesión iniciada pero existen estudiantes, tomamos el primero para evitar la pantalla en blanco
  if (!usuarioActivo && estudiantes.length > 0) {
    usuarioActivo = estudiantes[0];
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
  }

  const contenedorSinUsuario = document.getElementById("sin-usuario");
  const formEditar = document.getElementById("form-editar");

  // Si de plano no hay nadie, mostramos el aviso
  if (!usuarioActivo) {
    if (contenedorSinUsuario) contenedorSinUsuario.style.display = "block";
    if (formEditar) formEditar.style.display = "none";
    return;
  }

  // 2. Forzamos la visualización del formulario ocultando el aviso
  if (contenedorSinUsuario) contenedorSinUsuario.style.display = "none";
  if (formEditar) formEditar.style.display = "block";

  // 3. Capturamos los inputs del DOM
  const inputNombre = document.getElementById("edit-nombre");
  const inputCorreo = document.getElementById("edit-correo");
  const inputNumero = document.getElementById("edit-numero");
  const inputDias = document.getElementById("edit-dias");
  const inputTurno = document.getElementById("edit-turno");
  const inputEnsena = document.getElementById("edit-ensena");
  const inputBusca = document.getElementById("edit-busca");

  // 4. Rellenamos los campos con los datos actuales
  if (inputNombre) inputNombre.value = usuarioActivo.nombre || "";
  if (inputCorreo) inputCorreo.value = usuarioActivo.correo || "";
  if (inputNumero) inputNumero.value = usuarioActivo.telefono || usuarioActivo.numero || "";
  if (inputDias) inputDias.value = usuarioActivo.dias || "";
  if (inputTurno) inputTurno.value = usuarioActivo.turno || "";
  if (inputEnsena) inputEnsena.value = usuarioActivo.ensena || "";
  if (inputBusca) inputBusca.value = usuarioActivo.busca || "";

  // 5. Botón cancelar
  const btnCancelar = document.getElementById("btn-cancelar");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
  }

  // 6. Guardar cambios
  if (formEditar) {
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();

      usuarioActivo.nombre = inputNombre ? inputNombre.value : usuarioActivo.nombre;
      usuarioActivo.correo = inputCorreo ? inputCorreo.value : usuarioActivo.correo;
      usuarioActivo.telefono = inputNumero ? inputNumero.value : usuarioActivo.telefono;
      usuarioActivo.dias = inputDias ? inputDias.value : usuarioActivo.dias;
      usuarioActivo.turno = inputTurno ? inputTurno.value : usuarioActivo.turno;
      usuarioActivo.ensena = inputEnsena ? inputEnsena.value : usuarioActivo.ensena;
      usuarioActivo.busca = inputBusca ? inputBusca.value : usuarioActivo.busca;

      // Actualizamos el usuario activo
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

      // Actualizamos la lista general de estudiantes
      const index = estudiantes.findIndex(e => e.correo === usuarioActivo.correo);
      if (index !== -1) {
        estudiantes[index] = usuarioActivo;
      } else {
        estudiantes.push(usuarioActivo);
      }
      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

      alert("¡Perfil actualizado con éxito!");
      window.location.href = "perfil.html";
    });
  }
});