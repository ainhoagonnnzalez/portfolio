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
    // Cuando mueves el raton, movemos un poco la foto/subtitulo.
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      // Calculamos donde esta el raton dentro del hero.
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      // Mueve la foto un poco.
      gsap.to(photo, {
        x: offsetX * 20,
        y: offsetY * 16,
        duration: 0.7,
        ease: "power2.out"
      });

      // Mueve el subtitulo en direccion contraria.
      if (heroSub) {
        gsap.to(heroSub, {
          x: offsetX * -14,
          y: offsetY * -10,
          duration: 0.7,
          ease: "power2.out"
        });
      }
    });

    // Cuando sales del hero, todo vuelve al centro.
    hero.addEventListener("mouseleave", () => {
      gsap.to([photo, heroSub], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }
}

/* =====================
   ANIMAR SECCIONES AL BAJAR
===================== */

if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  // Recorremos todas las secciones.
  gsap.utils.toArray("section").forEach((section) => {
    // No queremos repetir animacion en el hero.
    if (section.classList.contains("hero")) return;

    // Animacion base suave para cada bloque.
    gsap.from(section, {
      opacity: 0,
      y: 88,
      scale: 0.96,
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
    gsap.from(".home-services .section-title, .home-services .section-intro, .home-services-text, .home-services-list", {
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
  gsap.from(".services-intro > *", {
    opacity: 0,
    y: 44,
    stagger: 0.12,
    duration: 0.9,
    ease: "power4.out"
  });

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
  const tiltTargets = document.querySelectorAll(".project-image, .process-step");

  tiltTargets.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: offsetX * 4,
        rotationX: offsetY * -3,
        transformPerspective: 700,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
}

/* =====================
   FOOTER
===================== */

// Animacion de entrada del footer.
if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".site-footer")) {
  gsap.from(".footer-brand, .footer-links", {
    y: 36,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 85%"
    }
  });

  gsap.from(".footer-bottom", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-bottom",
      start: "top 92%"
    }
  });
}

/* =====================
   EFECTO DE FONDO + RASTRO DEL RATON
===================== */

function initAmbientEffects() {
  // Si la persona ha activado "menos movimiento", no ponemos efectos.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // En pantallas pequenas tampoco, para no recargar.
  if (prefersReducedMotion || window.innerWidth < 768) return;

  // Capa de color suave del fondo.
  const glow = document.createElement("div");
  glow.className = "ambient-glow";
  document.body.prepend(glow);

  // Canvas para dibujar estrellas y rastro.
  const canvas = document.createElement("canvas");
  canvas.id = "cursor-trail-canvas";
  document.body.prepend(canvas);

  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let lastX = window.innerWidth * 0.5;
  let lastY = window.innerHeight * 0.5;
  let rafId = 0;
  let frameCount = 0;
  let pendingPointer = null;
  let pointerRaf = 0;
  let maxParticles = 160;

  // Aqui guardamos las particulas y estrellas.
  const particles = [];
  const stars = [];

  // Ajusta el tamano del canvas.
  function resizeCanvas() {
    // DPR más contenido para bajar carga en pantallas retina.
    dpr = Math.min(window.devicePixelRatio || 1, 1.3);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    maxParticles = Math.max(120, Math.min(220, Math.round(width / 5)));
  }

  // Crea una estrella con valores aleatorios.
  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.9 + 0.55,
      alpha: Math.random() * 0.22 + 0.07,
      twinkle: Math.random() * 0.05 + 0.015,
      rotation: Math.random() * Math.PI
    };
  }

  // Dibuja una estrella (en vez de un punto).
  function drawStar(x, y, spikes, outerRadius, innerRadius, rotation) {
    let angle = rotation;
    const step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(
      x + Math.cos(angle) * outerRadius,
      y + Math.sin(angle) * outerRadius
    );

    for (let i = 0; i < spikes; i += 1) {
      angle += step;
      context.lineTo(
        x + Math.cos(angle) * innerRadius,
        y + Math.sin(angle) * innerRadius
      );
      angle += step;
      context.lineTo(
        x + Math.cos(angle) * outerRadius,
        y + Math.sin(angle) * outerRadius
      );
    }

    context.closePath();
  }

  // Rellena la pantalla con estrellas.
  function seedStars() {
    stars.length = 0;
    const starCount = Math.max(56, Math.round(width / 34));

    for (let i = 0; i < starCount; i += 1) {
      stars.push(createStar());
    }
  }

  // Crea una particula en un punto.
  function spawnParticle(x, y) {
    if (particles.length >= maxParticles) return;

    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.7,
      vy: (Math.random() - 0.5) * 1.7,
      life: 1,
      size: Math.random() * 2 + 1.35,
      rotation: Math.random() * Math.PI
    });
  }

  function processPointer(x, y) {
    const distance = Math.hypot(x - lastX, y - lastY);
    const burst = Math.max(4, Math.min(11, Math.floor(distance / 7)));

    for (let i = 0; i < burst; i += 1) {
      const t = burst === 1 ? 1 : i / (burst - 1);
      spawnParticle(lastX + (x - lastX) * t, lastY + (y - lastY) * t);
    }

    lastX = x;
    lastY = y;
  }

  // Cada vez que mueves el raton, creamos nuevas particulas.
  function onPointerMove(event) {
    pendingPointer = { x: event.clientX, y: event.clientY };

    // Unificamos eventos rápidos del ratón en un solo update por frame.
    if (!pointerRaf) {
      pointerRaf = window.requestAnimationFrame(() => {
        if (pendingPointer) {
          processPointer(pendingPointer.x, pendingPointer.y);
          pendingPointer = null;
        }
        pointerRaf = 0;
      });
    }
  }

  // Este bucle dibuja todo una y otra vez.
  function render() {
    frameCount += 1;
    context.clearRect(0, 0, width, height);

    // Dibujar estrellas.
    for (let i = 0; i < stars.length; i += 1) {
      const star = stars[i];

      // Pequeno parpadeo de cada estrella.
      if (frameCount % 2 === 0) {
        star.alpha += (Math.random() - 0.5) * star.twinkle;
        star.alpha = Math.max(0.02, Math.min(0.22, star.alpha));
        star.rotation += 0.002;
      }

      context.fillStyle = `rgba(233, 226, 214, ${star.alpha})`;
      drawStar(star.x, star.y, 5, star.radius, star.radius * 0.24, star.rotation);
      context.fill();
    }

    // Dibujar particulas del rastro.
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy -= 0.01;
      particle.life -= 0.018;
      particle.size *= 0.992;
      particle.rotation += 0.022;

      // Cuando ya casi no se ve, la borramos.
      if (particle.life <= 0 || particle.size < 0.3) {
        particles.splice(i, 1);
        continue;
      }

      context.fillStyle = `rgba(233, 226, 214, ${particle.life * 0.92})`;
      context.shadowBlur = 14;
      context.shadowColor = "rgba(255, 230, 190, 0.55)";
      drawStar(
        particle.x,
        particle.y,
        5,
        particle.size,
        particle.size * 0.22,
        particle.rotation
      );
      context.fill();
      context.shadowBlur = 0;
    }

    // Pedimos el siguiente frame.
    rafId = window.requestAnimationFrame(render);
  }

  resizeCanvas();
  seedStars();
  render();

  // Si cambia el tamano de la ventana, recalculamos.
  window.addEventListener("resize", () => {
    resizeCanvas();
    seedStars();
  });

  // Escuchamos movimiento del puntero.
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // Si cambias de pestana, pausamos para ahorrar recursos.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = 0;
      return;
    }

    // Al volver, reactivamos.
    if (!rafId) render();
  });
}

// Arranca los efectos al cargar el archivo.
initAmbientEffects();
