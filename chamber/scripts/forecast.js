
const spotlightContainer = document.querySelector("#spotlights");


async function loadMembers() {
  try {

    const response = await fetch("data/members.json");
    const members = await response.json();

    const premiumMembers = members.filter(m => m.membership_level >= 2);

    if (premiumMembers.length === 0) {
      spotlightContainer.innerHTML = "<p>No premium members found.</p>";
      return;
    }

    const shuffled = premiumMembers.sort(() => Math.random() - 0.5);

    const selected = shuffled.slice(0, 3);


    spotlightContainer.innerHTML = "";
    selected.forEach(displaySpotlight);
  } catch (err) {
    console.error("Problem loading members:", err);
    spotlightContainer.innerHTML = "<p>Could not load members.</p>";
  }
}

function displaySpotlight(member) {
  const div = document.createElement("div");
  div.className = "spotlight";

  div.innerHTML = `
    <img src="${member.icon}" alt="${member.name} logo">
    <h3>${member.name}</h3>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p>${member.membership_level === 3 ? "Gold" : "Silver"} Member</p>
    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
    
  `;

  spotlightContainer.appendChild(div);
}

loadMembers();





// /////////////////////////////////events/////////////////////////////////////////////////////////////////////

async function loadEvents() {
  try {
    const res = await fetch("data/events.json");
    const events = await res.json();

    const list = document.querySelector("#events-list");

    events.forEach(event => {
      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <a href="${event.url}" target="_blank">Learn More</a>
      `;

      list.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading events:", err);
  }
}









async function loadEventOverlay() {
  try {
    const res = await fetch("data/events.json");
    const events = await res.json();

    let index = 0;
    const title = document.querySelector("#event-title");
    const date = document.querySelector("#event-date");
    const location = document.querySelector("#event-location");
    const link = document.querySelector("#event-link");
    const overlay = document.querySelector("#event-overlay");

    function showEvent(i) {
      overlay.style.opacity = 0;
      setTimeout(() => {
        title.textContent = events[i].title;
        date.textContent = `Date: ${events[i].date}`;
        location.textContent = `Location: ${events[i].location}`;
        link.href = events[i].url;
        overlay.style.opacity = 1;
      }, 500);
    }

    showEvent(index);

    setInterval(() => {
      index = (index + 1) % events.length;
      showEvent(index);
    }, 3000);
  } catch (err) {
    console.error("Error loading events overlay:", err);
  }
}


loadEvents();
loadEventOverlay();