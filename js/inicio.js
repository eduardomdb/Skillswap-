document.addEventListener("DOMContentLoaded", () => {
  inicializarDatosPrueba();

  const listaEstudiantes = document.getElementById("lista-estudiantes");
  const formBuscar = document.getElementById("form-buscar");
  const inputBuscar = document.getElementById("input-buscar");
  const btnMenu = document.getElementById("btn-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const btnIconoPerfil = document.getElementById("btn-icono-perfil");

  const btnMiPerfil = document.getElementById("btn-opcion-2");
  const btnReporte = document.getElementById("btn-opcion-reporte");

  const formPublicarDirecto = document.getElementById("form-publicar-directo");

  renderizarEstudiantes(obtenerEstudiantes());

  if (btnMenu && menuLateral) {
    btnMenu.addEventListener("click", () => {
      menuLateral.classList.toggle("activo");
    });
  }

  if (btnMiPerfil) {
    btnMiPerfil.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
  }

  if (btnIconoPerfil) {
    btnIconoPerfil.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
  }

  if (btnReporte) {
    btnReporte.addEventListener("click", () => {
      window.location.href = "reporte.html";
    });
  }

  if (formPublicarDirecto) {
    formPublicarDirecto.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nuevoEnsena = document.getElementById("publicar-ensena").value.trim();
      const nuevoBusca = document.getElementById("publicar-busca").value.trim();

      if (!nuevoEnsena || !nuevoBusca) {
        alert("Por favor completa ambas casillas para publicar.");
        return;
      }

      const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

      if (!usuarioActivo) {
        alert("Debes iniciar sesión para publicar un intercambio.");
        window.location.href = "index.html";
        return;
      }

      const nuevaPublicacion = {
        ...usuarioActivo,
        id: Date.now(),
        ensena: nuevoEnsena,
        busca: nuevoBusca
      };

      const estudiantes = obtenerEstudiantes();
      estudiantes.push(nuevaPublicacion);
      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

      alert("¡Habilidad publicada con éxito en el tablón!");
      formPublicarDirecto.reset();
      
      renderizarEstudiantes(estudiantes);
    });
  }

  if (formBuscar) {
    formBuscar.addEventListener("submit", (e) => {
      e.preventDefault();
      const termino = inputBuscar.value.toLowerCase().trim();
      const estudiantes = obtenerEstudiantes();

      const filtrados = estudiantes.filter((est) => {
        const matchEnsena = est.ensena && est.ensena.toLowerCase().includes(termino);
        const matchBusca = est.busca && est.busca.toLowerCase().includes(termino);
        const matchNombre = est.nombre && est.nombre.toLowerCase().includes(termino);
        return matchEnsena || matchBusca || matchNombre;
      });

      renderizarEstudiantes(filtrados, termino);
    });
  }
});


function obtenerEstudiantes() {
  return JSON.parse(localStorage.getItem("estudiantes")) || [];
}

function inicializarDatosPrueba() {
  const existentes = localStorage.getItem("estudiantes");
  if (!existentes || JSON.parse(existentes).length === 0) {
    const datosIniciales = [
      {
        id: 1,
        nombre: "Carlos Torrico",
        correo: "carlos@utepsa.edu.bo",
        password: "123",
        numero: "70012345",
        ensena: "Fundamentos de HTML y CSS",
        busca: "Inglés conversacional",
        dias: "Lunes y Miércoles",
        turno: "Tarde (15:00 - 17:00)",
        foto: null
      },
      {
        id: 2,
        nombre: "María Cahuasiri",
        correo: "maria@utepsa.edu.bo",
        password: "123",
        numero: "71198765",
        ensena: "Inglés técnico y avanzado",
        busca: "Programación en C y Python",
        dias: "Martes y Jueves",
        turno: "Mañana (09:00 - 11:00)",
        foto: null
      },
      {
        id: 3,
        nombre: "Eduardo Alvarado",
        correo: "eduardo@utepsa.edu.bo",
        password: "123",
        numero: "72233445",
        ensena: "Álgebra Lineal y Cálculo 1",
        busca: "Diseño UI/UX en Figma",
        dias: "Viernes",
        turno: "Noche (19:00 - 21:00)",
        foto: null
      }
    ];
    localStorage.setItem("estudiantes", JSON.stringify(datosIniciales));
  }
}

function renderizarEstudiantes(estudiantes, terminoBusqueda = "") {
  const contenedor = document.getElementById("lista-estudiantes");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (terminoBusqueda !== "") {
    const aviso = document.createElement("div");
    aviso.style.gridColumn = "1 / -1";
    aviso.style.marginBottom = "10px";
    aviso.style.fontSize = "14px";
    aviso.style.color = "#475569";
    aviso.innerHTML = `🔍 Resultados para: <strong>"${terminoBusqueda}"</strong> (${estudiantes.length} disponibles)`;
    contenedor.appendChild(aviso);
  }

  if (estudiantes.length === 0) {
    contenedor.innerHTML += `<p class="sin-resultados" style="grid-column: 1 / -1; color: #64748b; padding: 20px 0;">No se encontraron resultados para esa búsqueda.</p>`;
    return;
  }

  estudiantes.forEach((est) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-estudiante";

    let claseEnsena = "";
    if (terminoBusqueda && est.ensena && est.ensena.toLowerCase().includes(terminoBusqueda)) {
      claseEnsena = "style='background-color: #eff6ff; padding: 2px 4px; border-radius: 4px;'";
    }

    const avatarHTML = est.foto 
      ? `<img src="${est.foto}" alt="${est.nombre}" class="avatar-img">`
      : `<div class="avatar-default">
           <svg viewBox="0 0 24 24" width="22" height="22" fill="#2563eb">
             <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
           </svg>
         </div>`;

    tarjeta.innerHTML = `
      <div class="tarjeta-header">
        ${avatarHTML}
        <div>
          <h3>${est.nombre}</h3>
          <span class="badge-horario">🕒 ${est.dias || "Flexible"}</span>
        </div>
      </div>
      <div class="tarjeta-body">
        <p><strong>Enseña:</strong> <span ${claseEnsena}>${est.ensena || "No especificado"}</span></p>
        <p><strong>Busca:</strong> ${est.busca || "No especificado"}</p>
      </div>
      <div class="tarjeta-footer">
        <button type="button" class="btn-ver-perfil" onclick="verPerfil(${est.id})">Ver perfil</button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function verPerfil(idEstudiante) {
  const estudiantes = obtenerEstudiantes();
  const estudianteSeleccionado = estudiantes.find(est => est.id === idEstudiante);

  if (estudianteSeleccionado) {
    localStorage.setItem("perfilSeleccionado", JSON.stringify(estudianteSeleccionado));
    window.location.href = "ver-perfil.html";
  }
}