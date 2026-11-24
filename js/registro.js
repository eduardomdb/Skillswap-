const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const dias = document.getElementById("dias").value.trim();
  const turno = document.getElementById("turno").value.trim();
  const inputFoto = document.getElementById("foto");

  const guardarEstudiante = (fotoBase64) => {
    const nuevoEstudiante = {
      id: Date.now(),
      nombre,
      correo,
      password,
      numero,
      ensena: "A configurar (Crear solicitud)",
      busca: "A configurar (Crear solicitud)",
      dias,
      turno,
      foto: fotoBase64
    };

    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    estudiantes.push(nuevoEstudiante);

    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoEstudiante));
    localStorage.removeItem("modoInvitado");

    window.location.href = "inicio.html";
  };

  if (inputFoto.files && inputFoto.files[0]) {
    const reader = new FileReader();
    reader.onload = function (evento) {
      guardarEstudiante(evento.target.result);
    };
    reader.readAsDataURL(inputFoto.files[0]);
  } else {
    guardarEstudiante(null);
  }
});