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
   CUSTOM CURSOR
===================== */

function initCustomCursor() {
  // Comprobamos si el dispositivo tiene ratón "real" (no táctil).
  const canUseCustomCursor =
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches;

  // Si no se puede usar cursor personalizado, salimos.
  if (!canUseCustomCursor) return;

  // Añadimos una clase al <body> para activar estilos CSS del cursor.
  document.body.classList.add("has-custom-cursor");

  // Creamos el contenedor del cursor en el DOM.
  const cursor = document.createElement("div");
  // Le ponemos la clase para que coja estilo desde CSS.
  cursor.className = "custom-cursor";
  // Insertamos las 3 piezas visuales del cursor.
  cursor.innerHTML = `
    <span class="custom-cursor-halo"></span>
    <span class="custom-cursor-orb"></span>
    <span class="custom-cursor-spark">✦</span>
  `;
  // Lo añadimos al final del body.
  document.body.appendChild(cursor);

  // Guardamos referencias a cada parte del cursor para moverlas.
  const halo = cursor.querySelector(".custom-cursor-halo");
  const orb = cursor.querySelector(".custom-cursor-orb");
  const spark = cursor.querySelector(".custom-cursor-spark");

  // Posición objetivo (donde está el ratón).
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  // Posición actual (la que dibuja el cursor suavizado).
  let currentX = targetX;
  let currentY = targetY;

  // Cada vez que el ratón se mueve, actualizamos el objetivo.
  function onMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
  }

  // Bucle de animación del cursor.
  function animate() {
    // Seguimiento más rápido para que el cursor se sienta inmediato.
    currentX += (targetX - currentX) * 0.42;
    currentY += (targetY - currentY) * 0.42;

    // Movemos el halo con suavizado.
    halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    // Movemos el punto central casi pegado al ratón real.
    orb.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    // Movemos la chispa con un pequeño offset para dar estilo.
    spark.style.transform = `translate3d(${currentX + 14}px, ${currentY - 14}px, 0) translate(-50%, -50%)`;

    // Pedimos el siguiente frame para que siga animando.
    window.requestAnimationFrame(animate);
  }

  // Elementos donde queremos efecto "hover" del cursor.
  const interactive = document.querySelectorAll("a, button, .project-image, .highlight-card");
  interactive.forEach((element) => {
    // Al entrar con el ratón, activamos estado hover.
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    // Al salir, quitamos estado hover.
    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  // Escuchamos movimiento global del puntero.
  window.addEventListener("pointermove", onMove, { passive: true });
  // Si el puntero sale de la ventana, ocultamos cursor custom.
  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });
  // Si vuelve a entrar, lo mostramos.
  window.addEventListener("pointerenter", () => {
    cursor.style.opacity = "1";
  });

  // Arrancamos la animación continua.
  animate();
}

// Cursor personalizado desactivado: usamos el cursor normal del sistema.

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

/* =====================
   EFECTO DE FONDO + RASTRO DEL RATON
===================== */

function initAmbientEffects() {
  // Si la persona ha activado "menos movimiento", no ponemos efectos.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // En pantallas pequenas tampoco, para no recargar.
  const lowPowerDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  // Si se cumple alguna condición de rendimiento/accesibilidad, paramos aquí.
  if (prefersReducedMotion || window.innerWidth < 768 || lowPowerDevice) return;

  // Canvas para dibujar un rastro suave del cursor.
  const canvas = document.createElement("canvas");
  // ID para aplicar estilos CSS.
  canvas.id = "cursor-trail-canvas";
  // Lo metemos al principio del body para que quede detrás del contenido.
  document.body.prepend(canvas);

  // Contexto 2D para poder dibujar en el canvas.
  const context = canvas.getContext("2d");
  // Si falla el contexto, no seguimos.
  if (!context) return;

  // Variables de tamaño del canvas.
  let width = 0;
  let height = 0;
  // Device Pixel Ratio para que se vea nítido.
  let dpr = 1;
  // Última posición conocida del ratón.
  let lastX = window.innerWidth * 0.5;
  let lastY = window.innerHeight * 0.5;
  // ID del requestAnimationFrame para poder pausar/reanudar.
  let rafId = 0;
  // Contador simple para saber si hubo movimiento reciente.
  let moveTimer = 0;
  // Guardamos último evento de puntero pendiente de procesar.
  let pendingPointer = null;
  // ID del RAF del procesado de puntero.
  let pointerRaf = 0;
  // Límite de partículas en pantalla.
  let maxParticles = isLowPerformanceDevice ? 95 : 140;
  let isRendering = false;

  // Aqui guardamos las particulas del rastro.
  const particles = [];

  // Ajusta el tamano del canvas.
  function resizeCanvas() {
    // DPR más contenido para bajar carga en pantallas retina.
    dpr = Math.min(window.devicePixelRatio || 1, 1.3);
    // Guardamos ancho y alto actuales de la ventana.
    width = window.innerWidth;
    height = window.innerHeight;
    // Tamaño real del lienzo (en píxeles físicos).
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    // Escalamos para dibujar usando coordenadas CSS normales.
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Recalculamos máximo de partículas según ancho.
    maxParticles = isLowPerformanceDevice
      ? Math.max(70, Math.min(120, Math.round(width / 11)))
      : Math.max(100, Math.min(165, Math.round(width / 9)));
  }

  // Crea una particula en un punto.
  function spawnParticle(x, y) {
    // Si llegamos al limite, quitamos la mas antigua para mantener fluidez constante.
    if (particles.length >= maxParticles) {
      particles.shift();
    }

    // Insertamos una partícula nueva en el array.
    particles.push({
      // Posición inicial.
      x,
      y,
      // Velocidad inicial aleatoria para dispersión orgánica.
      vx: (Math.random() - 0.5) * 1.05,
      vy: (Math.random() - 0.5) * 1.05,
      // Vida de la partícula (1 = viva, 0 = muerta).
      life: 1,
      // Tamaño base de la estrella.
      size: Math.random() * (isLowPerformanceDevice ? 2.1 : 2.5) + 1.5,
      // Rotación inicial.
      rotation: Math.random() * Math.PI,
      // Velocidad de giro.
      spin: (Math.random() - 0.5) * 0.018
    });
  }

  // Dibuja una estrella tipo "sparkle" con cruz alargada.
  function drawSparkleStar(x, y, size, rotation) {
    // Función interna: dibuja una cruz alargada con curvas.
    function drawCross(arm, thickness) {
      // Comenzamos un nuevo trazo.
      context.beginPath();
      // Subimos a la punta superior.
      context.moveTo(0, -arm);
      // Curva hacia el centro.
      context.quadraticCurveTo(thickness, -thickness, 0, 0);
      // Curva hacia la punta inferior.
      context.quadraticCurveTo(thickness, thickness, 0, arm);
      // Volvemos por el lado izquierdo.
      context.quadraticCurveTo(-thickness, thickness, 0, 0);
      context.quadraticCurveTo(-thickness, -thickness, 0, -arm);
      // Cerramos y rellenamos.
      context.closePath();
      context.fill();

      // Segunda parte de la cruz (horizontal).
      context.beginPath();
      context.moveTo(-arm, 0);
      context.quadraticCurveTo(-thickness, thickness, 0, 0);
      context.quadraticCurveTo(thickness, thickness, arm, 0);
      context.quadraticCurveTo(thickness, -thickness, 0, 0);
      context.quadraticCurveTo(-thickness, -thickness, -arm, 0);
      context.closePath();
      context.fill();
    }

    // Guardamos estado actual del contexto.
    context.save();
    // Movemos el origen a la posición de la estrella.
    context.translate(x, y);
    // Rotamos la estrella.
    context.rotate(rotation);

    // Capa principal (más grande).
    drawCross(size * 1.9, size * 0.13);

    // Bajamos opacidad para la capa secundaria.
    context.globalAlpha *= 0.72;
    // Giramos 45 grados para el brillo secundario.
    context.rotate(Math.PI / 4);
    // Capa secundaria (más pequeña).
    drawCross(size * 0.85, size * 0.11);

    // Restauramos estado previo del contexto.
    context.restore();
  }

  function processPointer(x, y) {
    // Marcamos que hubo movimiento reciente.
    moveTimer = 9;
    // Distancia entre posición anterior y nueva.
    const distance = Math.hypot(x - lastX, y - lastY);
    // Cuántas estrellas crear según distancia recorrida.
    const burst = isLowPerformanceDevice
      ? Math.max(3, Math.min(8, Math.floor(distance / 11)))
      : Math.max(4, Math.min(11, Math.floor(distance / 9)));

    // Creamos partículas interpoladas para no dejar huecos.
    for (let i = 0; i < burst; i += 1) {
      const t = burst === 1 ? 1 : i / (burst - 1);
      spawnParticle(lastX + (x - lastX) * t, lastY + (y - lastY) * t);
    }

    // Guardamos nueva posición como última referencia.
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
          if (!isRendering) startRender();
          pendingPointer = null;
        }
        pointerRaf = 0;
      });
    }
  }

  function startRender() {
    isRendering = true;
    rafId = window.requestAnimationFrame(render);
  }

  // Este bucle dibuja todo una y otra vez.
  function render() {
    // Limpiamos el frame anterior.
    context.clearRect(0, 0, width, height);

    // Dibujar particulas del rastro.
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];

      // Actualizamos posición.
      particle.x += particle.vx;
      particle.y += particle.vy;
      // Reducimos vida poco a poco (fade out).
      particle.life -= 0.014;
      // Se hace un poco más pequeña con el tiempo.
      particle.size *= 0.993;
      // Gira ligeramente en cada frame.
      particle.rotation += particle.spin;

      // Cuando ya casi no se ve, la borramos.
      if (particle.life <= 0 || particle.size < 0.3) {
        particles.splice(i, 1);
        continue;
      }

      // Opacidad calculada según vida restante.
      const alpha = particle.life * 0.68;
      // Color de relleno crema.
      context.fillStyle = `rgba(233, 226, 214, ${alpha})`;
      // Glow alrededor.
      context.shadowBlur = isLowPerformanceDevice ? 8 : 12;
      context.shadowColor = `rgba(255, 234, 196, ${alpha * 0.9})`;
      // Dibujo de la estrella sparkle.
      drawSparkleStar(particle.x, particle.y, particle.size, particle.rotation);
      // Limpiamos blur para no contaminar siguientes dibujos.
      context.shadowBlur = 0;
    }

    // Si no se mueve el cursor, dejamos que se apague suavemente sin seguir generando carga visual.
    if (moveTimer > 0) moveTimer -= 1;

    // Si no quedan partículas y no hubo movimiento reciente, paramos el loop hasta próximo movimiento.
    if (particles.length === 0 && moveTimer <= 0) {
      isRendering = false;
      rafId = 0;
      return;
    }

    // Pedimos el siguiente frame.
    rafId = window.requestAnimationFrame(render);
  }

  // Ajustamos canvas al tamaño inicial.
  resizeCanvas();

  // Si cambia el tamano de la ventana, recalculamos.
  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  // Escuchamos movimiento del puntero.
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // Si cambias de pestana, pausamos para ahorrar recursos.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Paramos animación si la pestaña no está visible.
      cancelAnimationFrame(rafId);
      isRendering = false;
      rafId = 0;
      return;
    }

    // Al volver, reactivamos.
    if (!rafId && particles.length > 0) startRender();
  });
}

// Arranca los efectos al cargar el archivo.
initAmbientEffects();
