document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const btnInvitado = document.getElementById("btn-invitado");

  // Validar inicio de sesión con estudiantes registrados en localStorage
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();

      const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
      const usuarioEncontrado = estudiantes.find(
        (est) => est.correo && est.correo.toLowerCase() === email && est.password === password
      );

      if (usuarioEncontrado) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        localStorage.removeItem("modoInvitado");
        window.location.href = "inicio.html";
      } else {
        alert("Correo o contraseña incorrectos. Si aún no tienes cuenta, regístrate primero.");
      }
    });
  }

  // Ingresar como invitado
  if (btnInvitado) {
    btnInvitado.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      localStorage.setItem("modoInvitado", "true");
      window.location.href = "inicio.html";
    });
  }
});