
const copyright = document.querySelector("#currentyear");
const lastup = document.querySelector("#lastmodified");
const today = new Date();
const year = today.getFullYear();
lastup.innerText = `Last Modification ${document.lastModified}`
copyright.innerText = `\u00A9 ${year} 🌹 Gift Agbiji 🌹 Nigeria`
