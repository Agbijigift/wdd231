const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

 

const getProphetData = async () =>{
    const response = await fetch(url); 
  const data = await response.json(); 
displayProphets(data.prophets);


}
getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    
    let card = document.createElement('section');
    let fullName = document.createElement('h2'); 
    let portrait = document.createElement('img');
    let dateOfBirth = document.createElement('p');
    let placeOfBirth = document.createElement('p');

    
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; 
    dateOfBirth.textContent = `Date of birth: ${prophet.birthdate}`
    placeOfBirth.textContent = `place of birth: ${prophet.birthplace}`

    
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    
    card.appendChild(fullName); 
    card.appendChild(dateOfBirth);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); 
}