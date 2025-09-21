import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://njhvglogkxkuzfmrmabk.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaHZnbG9na3hrdXpmbXJtYWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjQ5NzcsImV4cCI6MjA3NDA0MDk3N30.-eLOPE4DcXNHLyx384BOXDWMIDBGUNDhPPNWkS3U7PU"; 
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("reseñaForm");
const lista = document.getElementById("container-reseñas");

// Enviar reseña
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;

  try {
    const { data, error } = await supabase
      .from("pollosReseñas")
      .insert([{ nombre, comentario }])
      .select(); // select() devuelve la fila insertada

    console.log("Insert result:", data, error);

    if (error) throw error; // fuerza catch si hay error

    // Todo salió bien, recargar página
    form.reset();
    window.location.reload();

  } catch(err) {
    alert("❌ Error al enviar reseña");
    console.error(err);
  }
});


// Cargar reseñas
async function cargarReseñas() {
  const { data, error } = await supabase
    .from("pollosReseñas")
    .select("*")
    .order("fecha", { ascending: false });

  if (!error) {
    lista.innerHTML = data.map(r => `
      <div class="reseña">
        <h3>${r.nombre}</h3>
        <div class="decorative-line"></div>
        <p>${r.comentario}</p>
        <small>${new Date(r.fecha).toLocaleString()}</small>
      </div>
    `).join("");
  }
}

// Inicial
cargarReseñas();


//Menu 
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');

hamburger.addEventListener('click', () => {
    overlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
});

overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        overlay.classList.remove('show');
    });
}); 
// Selecciona todos los enlaces internos del menú
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener('click', e => {
    e.preventDefault(); // Evita el salto automático

    const targetId = link.getAttribute('href').substring(1); // Quita el #
    const targetElem = document.getElementById(targetId);

    if (targetElem) {
        // Scroll suave hasta la posición menos 60px
        const offset = 60;
        const topPos = targetElem.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
    // Cierra overlay si está abierto (para móvil)
    if (overlay.classList.contains('show')) {
        overlay.classList.remove('show');
    }
    }
    })
})