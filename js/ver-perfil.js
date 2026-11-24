document.addEventListener("DOMContentLoaded", () => {
  const perfilData = JSON.parse(localStorage.getItem("perfilSeleccionado"));

  if (!perfilData) {
    alert("No se encontró información de este perfil.");
    window.location.href = "inicio.html";
    return;
  }

  const zonaFoto = document.getElementById("zona-foto");
  const elNombre = document.getElementById("dato-nombre");
  const elCorreo = document.getElementById("dato-correo");
  const elNumero = document.getElementById("dato-numero");
  const elEnsena = document.getElementById("dato-ensena");
  const elBusca = document.getElementById("dato-busca");
  const elDias = document.getElementById("dato-dias");
  const elTurno = document.getElementById("dato-turno");

  if (elNombre) elNombre.textContent = perfilData.nombre || "No especificado";
  if (elCorreo) elCorreo.textContent = perfilData.correo || "No especificado";
  if (elNumero) elNumero.textContent = perfilData.numero || "No especificado";
  if (elEnsena) elEnsena.textContent = perfilData.ensena || "No especificado";
  if (elBusca) elBusca.textContent = perfilData.busca || "No especificado";
  if (elDias) elDias.textContent = perfilData.dias || "Flexible";
  if (elTurno) elTurno.textContent = perfilData.turno || "A convenir";

  if (zonaFoto) {
    if (perfilData.foto) {
      zonaFoto.innerHTML = `<img src="${perfilData.foto}" alt="${perfilData.nombre}" class="foto-perfil-real">`;
    } else {
      const inicial = perfilData.nombre ? perfilData.nombre.charAt(0).toUpperCase() : "U";
      zonaFoto.innerHTML = `
        <div class="avatar-inicial-grande">
          <span>${inicial}</span>
        </div>`;
    }
  }
});