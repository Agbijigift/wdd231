(async function () {
  const grid = document.getElementById('discoverGrid');
  const visitorMessage = document.getElementById('visitorMessage');
  const DATA_URL = 'data/discover.json';


  async function loadData() {
    const res = await fetch(DATA_URL);
    if (!res.ok) {
      console.error('Failed to load data:', res.status);
      grid.innerHTML = '<p>Sorry, data could not be loaded.</p>';
      return [];
    }
    return res.json();
  }

  function buildCard(item) {
    const card = document.createElement('article');
    card.className = `card area-${item.id}`;


    card.style.gridArea = item.id;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${item.image}`;
    img.alt = item.name + ' photo';
    figure.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = item.name;

    const addr = document.createElement('address');
    addr.textContent = item.address;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Learn more';
    btn.addEventListener('click', () => {

      if (item.website) window.open(item.website, '_blank', 'noopener');
    });

    card.appendChild(figure);
    card.appendChild(h2);
    card.appendChild(addr);
    card.appendChild(desc);
    card.appendChild(btn);

    return card;
  }

 
  function updateVisitorMessage() {
    const LAST_VISIT_KEY = 'chamber_last_visit';
    const now = Date.now();
    const msPerDay = 1000 * 60 * 60 * 24;
    const last = parseInt(localStorage.getItem(LAST_VISIT_KEY), 10);

    if (!last) {
      visitorMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
      const diffMs = now - last;
      if (diffMs < msPerDay) {
        visitorMessage.textContent = 'Back so soon! Awesome!';
      } else {
        const days = Math.floor(diffMs / msPerDay);
        visitorMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
      }
    }

   
    localStorage.setItem(LAST_VISIT_KEY, String(now));
  }


  const data = await loadData();
  if (Array.isArray(data) && data.length) {
   
    data.forEach(item => {
      const card = buildCard(item);
      grid.appendChild(card);
    });
  } else {
    grid.innerHTML = '<p>No items to display.</p>';
  }

  updateVisitorMessage();
})();