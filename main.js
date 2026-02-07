
const roles = [
  "backend engineer",
  "web developer",
  "software engineer",
  "API-focused developer",
  "JavaScript developer",
  "Python developer"
];

const typingEl = document.getElementById("typing");

const baseText = "I am a ";
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 80;
const deletingSpeed = 50;
const pauseAfterType = 1800;
const pauseAfterDelete = 400;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // typing
    typingEl.textContent = baseText + currentRole.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => (isDeleting = true), pauseAfterType);
    }
  } else {
    // deleting
    typingEl.textContent = baseText + currentRole.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(() => {}, pauseAfterDelete);
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeLoop, speed);
}

// start animation
typeLoop();
