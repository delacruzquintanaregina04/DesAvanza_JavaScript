import { planets } from './data.js';

const planetInput = document.getElementById('planet-name');
const addButton = document.getElementById('add-planet');
const toggleThemeButton = document.getElementById('toggle-theme');
const planetList = document.getElementById('planet-list');
const planetCount = document.getElementById('planet-count');
const statusMessage = document.getElementById('status-message');

function renderPlanets() {
  planetList.innerHTML = planets
    .map((planet) => `<li>${planet}</li>`)
    .join('');
  planetCount.textContent = planets.length;
}

function setStatus(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`;
}

function addPlanet() {
  const newPlanet = planetInput.value.trim();

  if (!newPlanet) {
    setStatus('Ingresa el nombre de un planeta antes de agregar.', 'error');
    return;
  }

  if (planets.includes(newPlanet)) {
    setStatus('Este planeta ya está en la lista.', 'error');
    return;
  }

  planets.push(newPlanet);
  renderPlanets();
  planetInput.value = '';
  setStatus(`Planeta añadido: ${newPlanet}`, 'success');
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

export function initApp() {
  renderPlanets();
  addButton.addEventListener('click', addPlanet);
  toggleThemeButton.addEventListener('click', toggleTheme);
  planetInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addPlanet();
    }
  });
  setStatus('Listo para agregar planetas.', 'info');
}
