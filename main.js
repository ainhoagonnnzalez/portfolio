function goToHome() {
  window.location.assign("/index.html");
}

function goToProjects() {
  window.location.assign("/projects.html");
}

function goToServices() {
  window.location.assign("/services.html");
}

function goToContact() {
  window.location.assign("/contact.html");
}

/* Animaciones home */
if (document.querySelector(".title")) {
  gsap.from(".title", { y: 80, opacity: 0, duration: 1.2 });
  gsap.from(".photo", { y: 40, opacity: 0, duration: 1.2 });
}

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
  if (e.key === "Escape") {
    closeLightbox();
  }
});

/* CONTACT – EDITORIAL ANIMATION */
if (document.querySelector(".contact-layout")) {
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
    delay: 0.2,
    ease: "power3.out"
  });

  gsap.from(".contact-cta", {
    opacity: 0,
    duration: 0.6,
    delay: 0.4
  });

  gsap.from(".contact-block", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.5,
    ease: "power3.out"
  });
}

/* CTA */
function goToContactMail() {
  window.location.href = "mailto:ainhoagonnnzalez@gmail.com";
}