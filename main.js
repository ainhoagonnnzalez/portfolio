/* =====================
   NAVEGACION
===================== */

// Esta funcion te lleva a la pagina principal.
function goToHome() {
  window.location.href = "index.html";
}

// Esta funcion te lleva a la pagina de proyectos.
function goToProjects() {
  window.location.href = "projects.html";
}

// Esta funcion te lleva a la pagina de servicios.
function goToServices() {
  window.location.href = "services.html";
}

// Esta funcion te lleva a la pagina de contacto.
function goToContact() {
  window.location.href = "contact.html";
}

// Esta funcion abre el correo para escribirte un email.
function goToContactMail() {
  window.location.href = "mailto:ainhoagonnnzalez@gmail.com";
}

/* =====================
   HEADER QUE CAMBIA AL HACER SCROLL
===================== */

// Guardamos el header en una variable para usarlo luego.
const siteHeader = document.querySelector(".site-header");

// Esta funcion pone o quita una clase segun cuanto has bajado.
function updateHeaderOnScroll() {
  // Si no existe el header, no hacemos nada.
  if (!siteHeader) return;

  // Si has bajado mas de 24px, anade la clase "scrolled".
  // Si no, la quita.
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

// Cada vez que haces scroll, actualizamos el header.
window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

// Lo ejecutamos una vez al cargar.
updateHeaderOnScroll();

/* =====================
   LIGHTBOX (IMAGEN GRANDE)
===================== */

// Abre el lightbox y mete dentro la imagen que pasas.
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  // Cambiamos la imagen mostrada.
  img.src = src;

  // Mostramos el lightbox.
  lightbox.style.display = "flex";
}

// Cierra el lightbox.
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Si pulsas Escape, se cierra el lightbox.
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

/* =====================
   COMPROBAR GSAP
===================== */

// Miramos si GSAP existe en la pagina.
const hasGSAP = typeof gsap !== "undefined";
// Bandera global para detectar equipos donde conviene bajar carga.
const isLowPerformanceDevice =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 6) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 8);

// Si existe GSAP y ScrollTrigger, lo activamos.
if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =====================
   HERO DE INICIO
===================== */

// Solo hacemos esto si estamos en una pagina con hero y con GSAP.
if (hasGSAP && document.querySelector(".hero")) {
  // Esto ayuda a que la foto quede bien centrada.
  gsap.set(".photo", { xPercent: -50, yPercent: -50 });

  // Si el titulo tiene letras separadas, animamos letra por letra.
  if (document.querySelector(".title span")) {
    gsap.from(".title span", {
      y: 120,
      opacity: 0,
      stagger: 0.06,
      duration: 1.2,
      ease: "power4.out"
    });
  } else {
    // Si no, animamos el titulo completo.
    gsap.from(".title", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out" });
  }

  // Animacion de entrada de la foto.
  gsap.from(".photo", {
    scale: 1.15,
    opacity: 0,
    duration: 1.4,
    delay: 0.25,
    ease: "power3.out"
  });

  // Buscamos elementos para el efecto con el raton.
  const hero = document.querySelector(".hero");
  const photo = document.querySelector(".photo");
  const heroSub = document.querySelector(".hero-sub");

  // Solo activamos si existen hero y photo.
  if (hero && photo) {
    // Un solo tween reutilizable: no se crea uno nuevo en cada movimiento.
    const movePhotoX = gsap.quickTo(photo, "x", { duration: 0.7, ease: "power2.out" });
    const movePhotoY = gsap.quickTo(photo, "y", { duration: 0.7, ease: "power2.out" });
    const moveSubX = heroSub ? gsap.quickTo(heroSub, "x", { duration: 0.7, ease: "power2.out" }) : null;
    const moveSubY = heroSub ? gsap.quickTo(heroSub, "y", { duration: 0.7, ease: "power2.out" }) : null;

    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      movePhotoX(offsetX * 20);
      movePhotoY(offsetY * 16);

      if (moveSubX && moveSubY) {
        moveSubX(offsetX * -14);
        moveSubY(offsetY * -10);
      }
    });

    hero.addEventListener("mouseleave", () => {
      movePhotoX(0);
      movePhotoY(0);

      if (moveSubX && moveSubY) {
        moveSubX(0);
        moveSubY(0);
      }
    });
  }
}

/* =====================
   ANIMAR SECCIONES AL BAJAR
===================== */

if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  // Recorremos todas las secciones.
  gsap.utils.toArray("section").forEach((section) => {
    // El hero y las secciones con animación propia no se mueven otra vez.
    if (section.classList.contains("hero")) return;
    if (section.matches(".intro, .home-highlights, .home-services, .home-projects, .home-process, .home-cta, .projects, .services, .contact")) return;

    gsap.from(section, {
      opacity: 0,
      y: 88,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Animacion para las lineas divisoras.
  gsap.utils.toArray(".editorial-line").forEach((line) => {
    gsap.from(line, {
      scaleX: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: line,
        start: "top 88%"
      }
    });
  });
}

/* =====================
   BLOQUES INTERNOS (HOME)
===================== */

// Animaciones internas para que cada bloque tenga más entrada visual.
if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  if (document.querySelector(".intro")) {
    gsap.from(".intro-text > *", {
      opacity: 0,
      y: 44,
      stagger: 0.14,
      duration: 0.95,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".intro",
        start: "top 86%"
      }
    });

    gsap.from(".intro-photo", {
      opacity: 0,
      x: 80,
      rotate: 2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".intro",
        start: "top 84%"
      }
    });
  }

  if (document.querySelector(".home-services")) {
    gsap.from(".home-services .section-title, .home-services .section-intro", {
      opacity: 0,
      y: 40,
      stagger: 0.13,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".home-services",
        start: "top 88%"
      }
    });
  }

  if (document.querySelector(".home-process")) {
    gsap.from(".home-process .section-title, .home-process .section-intro", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".home-process",
        start: "top 88%"
      }
    });

    gsap.from(".process-step", {
      opacity: 0,
      y: 60,
      stagger: 0.16,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".process-grid",
        start: "top 88%"
      }
    });
  }

  if (document.querySelector(".home-cta")) {
    gsap.from(".home-cta h2, .home-cta-note, .home-cta .contact-cta", {
      opacity: 0,
      y: 50,
      stagger: 0.14,
      duration: 0.95,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".home-cta",
        start: "top 90%"
      }
    });
  }
}

/* =====================
   HIGHLIGHTS ANIMATION
===================== */

// Animamos las tarjetas de valor añadido al entrar en pantalla.
if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".highlights-grid")) {
  gsap.from(".home-highlights .section-title, .home-highlights .section-intro", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.12,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".home-highlights",
      start: "top 88%"
    }
  });

  gsap.from(".highlight-card", {
    opacity: 0,
    y: 70,
    stagger: 0.16,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".highlights-grid",
      start: "top 90%"
    }
  });
}

/* =====================
   PROYECTOS EN HOME
===================== */

// Animamos cards de proyectos cuando aparecen.
if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".projects-grid")) {
  gsap.from(".home-projects .section-title, .home-projects .section-intro, .home-projects-link", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.12,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".home-projects",
      start: "top 88%"
    }
  });

  gsap.from(".project", {
    opacity: 0,
    y: 90,
    stagger: 0.2,
    duration: 1.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 90%"
    }
  });
}

/* =====================
   PROJECTS PAGE ANIMATION
===================== */

if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".projects-list")) {
  gsap.from(".projects-header > *", {
    opacity: 0,
    y: 46,
    stagger: 0.12,
    duration: 0.95,
    ease: "power4.out"
  });

  gsap.utils.toArray(".project-row").forEach((row, index) => {
    const direction = index % 2 === 0 ? -1 : 1;

    gsap.from(row.querySelector(".project-media"), {
      opacity: 0,
      x: 90 * direction,
      y: 34,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%"
      }
    });

    gsap.from(row.querySelector(".project-text"), {
      opacity: 0,
      x: -70 * direction,
      y: 28,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%"
      }
    });
  });
}

/* =====================
   SERVICES PAGE ANIMATION
===================== */

if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".services-blocks")) {
  if (document.querySelector(".services-intro")) {
    gsap.from(".services-intro > *", {
      opacity: 0,
      y: 44,
      stagger: 0.12,
      duration: 0.9,
      ease: "power4.out"
    });
  }

  gsap.from(".service-block", {
    opacity: 0,
    y: 66,
    stagger: 0.16,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".services-blocks",
      start: "top 90%"
    }
  });
}

/* =====================
   PAGINA DE CONTACTO
===================== */

// Estas animaciones solo se usan si existe el layout de contacto.
if (hasGSAP && document.querySelector(".contact-layout")) {
  gsap.from(".contact-headline", {
    y: 64,
    opacity: 0,
    duration: 1.1,
    ease: "power4.out"
  });

  gsap.from(".contact-intro", {
    y: 44,
    opacity: 0,
    duration: 0.95,
    delay: 0.18,
    ease: "power4.out"
  });

  gsap.from(".contact-cta", {
    opacity: 0,
    y: 28,
    duration: 0.8,
    delay: 0.36
  });

  gsap.from(".contact-block", {
    y: 44,
    opacity: 0,
    duration: 0.95,
    stagger: 0.18,
    delay: 0.48,
    ease: "power4.out"
  });
}

/* =====================
   INTERACTIVE HOVER TILT
===================== */

// Efecto suave de inclinacion en tarjetas/imagenes para dar vida al layout.
if (hasGSAP) {
  // En equipos justos, quitamos este efecto para priorizar fluidez.
  if (isLowPerformanceDevice) {
    // No hacemos tilt interactivo en modo rendimiento.
  } else {
  const tiltTargets = document.querySelectorAll(".project-image, .process-step");

  tiltTargets.forEach((card) => {
    // Preparamos setters rápidos (evita crear cientos de tweens por segundo).
    const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.22, ease: "power2.out" });
    const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.22, ease: "power2.out" });
    gsap.set(card, {
      transformPerspective: 700,
      transformOrigin: "center"
    });

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      rotateYTo(offsetX * 3.2);
      rotateXTo(offsetY * -2.4);
    });

    card.addEventListener("mouseleave", () => {
      rotateYTo(0);
      rotateXTo(0);
    });
  });
  }
}

/* =====================
   FOOTER
===================== */

// Animacion de entrada del footer.
if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".site-footer")) {
  // Fallback visual: evita que el bloque final se quede oculto por un estado intermedio.
  gsap.set(".footer-bottom", { autoAlpha: 1, y: 0, clearProps: "transform" });

  const footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 85%",
      once: true
    }
  });

  footerTl.from(".footer-brand, .footer-links", {
    y: 36,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out"
  });

  footerTl.fromTo(
    ".footer-bottom",
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      immediateRender: false
    },
    "-=0.25"
  );
}

// ========================================
// VIDEO DEMO BS WRAPS
// ========================================

function openVideo() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("bswraps-video");

  if (!modal || !video) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  video.play().catch(() => {});
}

function closeVideo() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("bswraps-video");

  if (!modal || !video) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";

  video.pause();
  video.currentTime = 0;
}

// Cerrar haciendo clic fuera del vídeo
document.getElementById("video-modal")?.addEventListener("click", function(event) {
  if (event.target === this) {
    closeVideo();
  }
});

// Cerrar pulsando ESC
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeVideo();
  }
});