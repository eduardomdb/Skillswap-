document.addEventListener("DOMContentLoaded", () => {
  let perfilData = JSON.parse(localStorage.getItem("perfilSeleccionado"));
  
  if (!perfilData) {
    perfilData = JSON.parse(localStorage.getItem("usuarioActivo"));
  }

  const contenedorSinPerfil = document.getElementById("sin-perfil");
  const contenidoPerfil = document.getElementById("contenido-perfil");

  if (!perfilData) {
    if (contenedorSinPerfil) contenedorSinPerfil.style.display = "block";
    if (contenidoPerfil) contenidoPerfil.style.display = "none";
    return;
  }

  if (contenedorSinPerfil) contenedorSinPerfil.style.display = "none";
  if (contenidoPerfil) contenidoPerfil.style.display = "block";

  const elNombre = document.getElementById("perfil-nombre");
  const elCorreo = document.getElementById("perfil-correo");
  const elTelefono = document.getElementById("perfil-telefono");
  const elEnsena = document.getElementById("lista-ensena");
  const elBusca = document.getElementById("lista-busca");
  const elDisponibilidad = document.getElementById("caja-disponibilidad-cuerpo");
  
  const perfilFoto = document.getElementById("perfil-foto");
  const perfilAvatarDefecto = document.getElementById("perfil-avatar-defecto");

  if (elNombre) elNombre.textContent = perfilData.nombre || "Nombre no especificado";
  if (elCorreo) elCorreo.textContent = perfilData.correo || "Correo no especificado";
  if (elTelefono) elTelefono.textContent = perfilData.telefono || perfilData.numero || "Teléfono no especificado";
  
  if (elEnsena) elEnsena.textContent = perfilData.ensena || "No especificado";
  if (elBusca) elBusca.textContent = perfilData.busca || "No especificado";
  if (elDisponibilidad) elDisponibilidad.textContent = `${perfilData.dias || "Flexible"} - ${perfilData.turno || "A convenir"}`;

  if (perfilData.foto && perfilFoto && perfilAvatarDefecto) {
    perfilFoto.src = perfilData.foto;
    perfilFoto.style.display = "block";
    perfilAvatarDefecto.style.display = "none";
  } else if (perfilAvatarDefecto) {
    perfilAvatarDefecto.style.display = "flex";
    if (perfilFoto) perfilFoto.style.display = "none";
  }

  const btnEditar = document.getElementById("btn-editar-perfil");
  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      window.location.href = "editar-perfil.html";
    });
  }
});