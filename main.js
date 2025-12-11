import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// FireBase's config to conect to my DB(portfolio-site) data
const firebaseConfig = {
  apiKey: "AIzaSyB9hRfGNSFiHblKfJDAdjiyj5c1_Ydlp9Y",
  authDomain: "portfoliosite-22ba3.firebaseapp.com",
  projectId: "portfoliosite-22ba3",
  storageBucket: "portfoliosite-22ba3.firebasestorage.app",
  messagingSenderId: "1022382562624",
  appId: "1:1022382562624:web:197f56937c9b5045b46ea5",
  measurementId: "G-1Q3VNY7J1X"
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