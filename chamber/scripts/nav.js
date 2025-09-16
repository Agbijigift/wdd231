

const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");

navbutton.addEventListener("click", () => {
  navbutton.classList.toggle("show");
  navlinks.classList.toggle("show");
});


async function loadMembers(view = "grid") {
  try {
    const response = await fetch("data/members.json"); 
    const members = await response.json();

    const container = document.getElementById("directory");
    container.innerHTML = ""; 

    if (view === "grid") {
      container.className = "grid";
      members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${member.icon}" alt="${member.name} logo">
          <h3>${member.name}</h3>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p><strong>Category:</strong> ${member.category}</p>
        `;
        container.appendChild(card);
      });

    } else if (view === "list") {
      container.className = "list";

      const header = document.createElement("div");
      header.classList.add("list-row", "list-header");
      header.innerHTML = `
        <div class="list-cell">Name</div>
        <div class="list-cell">Address</div>
        <div class="list-cell">Phone</div>
        <div class="list-cell">Website</div>
        
      `;
      container.appendChild(header);

      members.forEach(member => {
        const row = document.createElement("div");
        row.classList.add("list-row");
        row.innerHTML = `
          <div class="list-cell" data-label="Name">${member.name}</div>
          <div class="list-cell" data-label="Address">${member.address}</div>
          <div class="list-cell" data-label="Phone">${member.phone}</div>
          <div class="list-cell" data-label="Website">
            <a href="${member.website}" target="_blank">${member.website}</a>
          </div>
         
        `;
        container.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

document.getElementById("gridView").addEventListener("click", () => loadMembers("grid"));
document.getElementById("listView").addEventListener("click", () => loadMembers("list"));


loadMembers("grid");