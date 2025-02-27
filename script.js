
function detectOS() {
  const userAgent = navigator.userAgent;
  let os = "Système inconnu";

  if (userAgent.indexOf("Windows") !== -1) os = "Windows";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) os = "iOS";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";

  document.getElementById("os-info").textContent = `Système détecté : ${os}`;
  highlightOSButtons(os);
}

function highlightOSButtons(os) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    if ((button.classList.contains("windows") && os === "Windows") ||
        (button.classList.contains("linux") && os === "Linux") ||
        (button.classList.contains("android") && os === "Android") ||
        (button.classList.contains("ios") && os === "iOS")) {
      button.style.boxShadow = "0 0 20px var(--primary-color)";
    }
  });
}

function initializeGameCards() {
  const gameCards = document.querySelectorAll('.game-card');
  const modal = document.getElementById('game-modal');
  const modalContent = document.getElementById('modal-game-content');
  const closeButton = document.querySelector('.close-button');

  const gameDetails = {
    game1: {
      title: "Fantasy Quest",
      description: "Plongez dans un monde fantastique rempli de magie et d'aventures.",
      releaseDate: "15 Mars 2023",
      story: "Dans un royaume lointain menacé par les forces du mal...",
      features: ["Monde ouvert", "Quêtes épiques", "Personnages personnalisables"],
      image: "https://picsum.photos/seed/game1/800/400"
    },
    game2: {
      title: "Space Explorer",
      description: "Explorez l'infini de l'espace dans cette aventure spatiale.",
      releaseDate: "1 Juin 2023",
      story: "Dans un futur lointain, l'humanité s'est lancée à la conquête des étoiles...",
      features: ["Exploration spatiale", "Combats tactiques", "Commerce intergalactique"],
      image: "https://picsum.photos/seed/game2/800/400"
    }
  };

  gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        const gameId = card.dataset.game;
        const game = gameDetails[gameId];
        
        modalContent.innerHTML = `
          <img src="${game.image}" alt="${game.title}" style="width: 100%; border-radius: 10px;">
          <h2>${game.title}</h2>
          <p><strong>Date de sortie:</strong> ${game.releaseDate}</p>
          <p>${game.description}</p>
          <h3>Histoire</h3>
          <p>${game.story}</p>
          <h3>Caractéristiques</h3>
          <ul>
            ${game.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        `;
        
        modal.style.display = 'block';
      }
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function initializeButtonEvents() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const game = this.closest('.game-card').querySelector('h2').textContent;
      alert(`Téléchargement de ${game} pour ${this.textContent.trim()}`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  detectOS();
  initializeGameCards();
  initializeButtonEvents();
});
