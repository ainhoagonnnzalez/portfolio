/* =====================
   NAV
===================== */
function goToHome() {
  window.location.href = "index.html";
}

function goToProjects() {
  window.location.href = "projects.html";
}

function goToServices() {
  window.location.href = "services.html";
}

function goToContact() {
  window.location.href = "contact.html";
}

function goToContactMail() {
  window.location.href = "mailto:ainhoagonnnzalez@gmail.com";
}

/* =====================
   LIGHTBOX
===================== */
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

/* Cerrar con ESC */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

/* =====================
   GSAP SAFE INIT
===================== */
const hasGSAP = typeof gsap !== "undefined";

if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =====================
   HOME – HERO ANIMATION
===================== */
if (hasGSAP && document.querySelector(".hero")) {
  // Letras del título (solo si existen spans)
  if (document.querySelector(".title span")) {
    gsap.from(".title span", {
      y: 120,
      opacity: 0,
      stagger: 0.06,
      duration: 1.2,
      ease: "power4.out"
    });
  } else {
    gsap.from(".title", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out" });
  }

  gsap.from(".photo", {
    scale: 1.15,
    opacity: 0,
    duration: 1.4,
    delay: 0.25,
    ease: "power3.out"
  });
}

/* =====================
   SCROLL REVEAL SECTIONS
===================== */
if (hasGSAP && typeof ScrollTrigger !== "undefined") {
  gsap.utils.toArray("section").forEach((section) => {
    // No animar el HERO como sección "reveal"
    if (section.classList.contains("hero")) return;

    gsap.from(section, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
}

/* =====================
   PROJECTS GRID ANIMATION
===================== */
if (hasGSAP && typeof ScrollTrigger !== "undefined" && document.querySelector(".projects-grid")) {
  gsap.from(".project", {
    opacity: 0,
    y: 60,
    stagger: 0.18,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%"
    }
  });
}

/* =====================
   CONTACT – EDITORIAL ANIMATION
===================== */
if (hasGSAP && document.querySelector(".contact-layout")) {
  gsap.from(".contact-headline", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".contact-intro", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power3.out"
  });

  gsap.from(".contact-cta", {
    opacity: 0,
    duration: 0.6,
    delay: 0.35
  });

  gsap.from(".contact-block", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.45,
    ease: "power3.out"
  });
}