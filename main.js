import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// FireBase's config to conect to my DB(portfolio-site) data
const firebaseConfig = {
  apiKey: "AIzaSyB9hRfGNSFiHblKfJDAdjiyj5c1_Ydlp9Y",
  authDomain: "portfoliosite-22ba3.firebaseapp.com",
  projectId: "portfoliosite-22ba3",
  storageBucket: "portfoliosite-22ba3.firebasestorage.app",
  messagingSenderId: "1022382562624",
  appId: "1:1022382562624:web:197f56937c9b5045b46ea5",
  measurementId: "G-1Q3VNY7J1X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProjects() {
  const projectsDiv = document.getElementById("projects");
  projectsDiv.textContent = "Loading projects...";

  try {
    const snap = await getDocs(collection(db, "projects"));

    if (snap.empty) {
      projectsDiv.textContent = "No projects yet.";
      return;
    }

    projectsDiv.innerHTML = "";

    snap.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("article");
      card.className = "project-card";

      card.innerHTML = `
        <h3>${data.title || "Untitled Project"}</h3>
        <p>${data.description || ""}</p>
        <p><strong>Tech:</strong> ${data.techStack || ""}</p>
        <p>
          ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank">Live Site</a>` : ""}
          ${data.repoUrl ? ` | <a href="${data.repoUrl}" target="_blank">GitHub</a>` : ""}
        </p>
      `;

      projectsDiv.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    projectsDiv.textContent = "Error loading projects.";
  }
}

loadProjects();

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
