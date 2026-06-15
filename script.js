// =============================
// LOADER
// =============================

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader =
    document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

      loader.style.display = "none";

      const music =
      document.getElementById("bgMusic");

      music.volume = 0.7;

      music.play().catch(() => {
        console.log("Waiting for user interaction");
      });

    }, 1000);

  }, 2500);

});

// =============================
// SMOOTH SCROLL
// =============================

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// =============================
// FLOATING HEARTS
// =============================

const heartsContainer =
document.getElementById("hearts-container");

function createHeart() {

  const heart =
  document.createElement("div");

  heart.classList.add("heart");

  heart.innerHTML = "❤️";

  heart.style.left =
  Math.random() * 100 + "vw";

  heart.style.fontSize =
  Math.random() * 20 + 15 + "px";

  heart.style.animationDuration =
  Math.random() * 5 + 6 + "s";

  heart.style.bottom = "-40px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}

setInterval(createHeart, 500);

// =============================
// MUSIC CONTROL
// =============================

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

  if (!musicPlaying) {

    music.play();

    musicBtn.innerHTML = "⏸️";

    musicPlaying = true;

  } else {

    music.pause();

    musicBtn.innerHTML = "🎵";

    musicPlaying = false;
  }

});
// =============================
// START JOURNEY
// =============================

function startJourney() {

  music.volume = 0.7;

  music.play().catch(err => {
    console.log("Music autoplay blocked");
  });

  musicBtn.innerHTML = "⏸️";

  musicPlaying = true;

  scrollToSection("story");
}

// =============================
// LETTER OPENING
// =============================

const envelope =
document.getElementById("envelope");

const letterCard =
document.querySelector(".letter-card");

let opened = false;

envelope.addEventListener("click", () => {

  if (!opened) {

    letterCard.style.display = "block";

    letterCard.animate([
      {
        opacity: 0,
        transform: "translateY(40px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ], {
      duration: 700,
      fill: "forwards"
    });

    opened = true;

  } else {

    letterCard.style.display = "none";

    opened = false;
  }

});

// =============================
// GALLERY LIGHTBOX
// =============================

const galleryImages =
document.querySelectorAll(".gallery-grid img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

const closeLightbox =
document.getElementById("closeLightbox");

galleryImages.forEach(img => {

  img.addEventListener("click", () => {

    lightbox.style.display = "flex";

    lightboxImg.src = img.src;

    document.body.style.overflow = "hidden";

  });

});

closeLightbox.addEventListener("click", () => {

  lightbox.style.display = "none";

  document.body.style.overflow = "auto";

});

lightbox.addEventListener("click", e => {

  if (e.target === lightbox) {

    lightbox.style.display = "none";

    document.body.style.overflow = "auto";

  }

});

// =============================
// FADE IN ON SCROLL
// =============================

const observer =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.style.opacity = "1";

      entry.target.style.transform =
      "translateY(0)";

    }

  });

}, {
  threshold: 0.15
});

document.querySelectorAll(
".timeline-card, .gallery-grid img, .final-card"
).forEach(el => {

  el.style.opacity = "0";

  el.style.transform =
  "translateY(50px)";

  el.style.transition =
  "all .8s ease";

  observer.observe(el);

});

// =============================
// HERO IMAGE GLOW EFFECT
// =============================

const heroCard =
document.querySelector(".hero-image-card");

let glow = 0;

setInterval(() => {

  glow += 0.05;

  heroCard.style.boxShadow = `
  0 0 ${40 + Math.sin(glow) * 15}px rgba(255,77,157,.4),
  0 0 ${100 + Math.sin(glow) * 25}px rgba(255,77,157,.2)
  `;

}, 50);

// =============================
// CONFETTI SYSTEM
// =============================

const canvas =
document.getElementById("confettiCanvas");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let confetti = [];

function resizeCanvas() {

  canvas.width =
  window.innerWidth;

  canvas.height =
  window.innerHeight;

}

window.addEventListener(
"resize",
resizeCanvas
);

function createConfetti() {

  confetti = [];

  for (let i = 0; i < 250; i++) {

    confetti.push({

      x:
      Math.random() * canvas.width,

      y:
      Math.random() * canvas.height - canvas.height,

      size:
      Math.random() * 8 + 4,

      speed:
      Math.random() * 4 + 2,

      rotation:
      Math.random() * 360,

      color:
      [
        "#ff4d9d",
        "#ff85c1",
        "#ffffff",
        "#ffd166"
      ][Math.floor(Math.random() * 4)]

    });

  }

}

function animateConfetti() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  confetti.forEach(c => {

    ctx.save();

    ctx.translate(
      c.x,
      c.y
    );

    ctx.rotate(
      c.rotation *
      Math.PI / 180
    );

    ctx.fillStyle =
    c.color;

    ctx.fillRect(
      -c.size / 2,
      -c.size / 2,
      c.size,
      c.size
    );

    ctx.restore();

    c.y += c.speed;

    c.rotation += 4;

  });

  requestAnimationFrame(
    animateConfetti
  );

}

const confettiBtn =
document.getElementById(
"confettiBtn"
);

confettiBtn.addEventListener(
"click",
() => {

  createConfetti();

  animateConfetti();

  confettiBtn.innerHTML =
  "🎉 Happy Birthday 🎉";

}
);

// =============================
// AUTO HIDE CONFETTI
// =============================

setInterval(() => {

  if (confetti.length > 0) {

    confetti.forEach(c => {
      c.y += 2;
    });

    confetti =
    confetti.filter(
      c => c.y < canvas.height + 50
    );

  }

}, 100);

// =============================
// PARALLAX EFFECT
// =============================

document.addEventListener(
"mousemove",
(e) => {

  const x =
  (window.innerWidth / 2 - e.pageX) / 40;

  const y =
  (window.innerHeight / 2 - e.pageY) / 40;

  heroCard.style.transform =
  `translate(${x}px, ${y}px)`;

});

// =============================
// BIRTHDAY MESSAGE POPUP
// =============================

setTimeout(() => {

  console.log(
    "Happy Birthday Cutie Patoti ❤️"
  );

}, 5000);