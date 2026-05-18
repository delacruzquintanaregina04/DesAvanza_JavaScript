const fetchButton = document.getElementById("fetch-button");
const axiosButton = document.getElementById("axios-button");
const dataContainer = document.getElementById("data-container");
const API_URL = "https://rickandmortyapi.com/api/character";

function renderCharacters(characters) {
  dataContainer.innerHTML = "";

  if (!characters || characters.length === 0) {
    dataContainer.innerHTML = "<p>No se encontraron personajes.</p>";
    return;
  }

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <div class="info">
        <h2>${character.name}</h2>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Estado:</strong> <span class="status">${character.status}</span></p>
      </div>
    `;

    dataContainer.appendChild(card);
  });
}

async function fetchCharactersWithFetch() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }
    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    console.error("Error usando fetch:", error);
    dataContainer.innerHTML = `<p>Error al obtener personajes con fetch: ${error.message}</p>`;
  }
}

async function fetchCharactersWithAxios() {
  try {
    const response = await axios.get(API_URL);
    renderCharacters(response.data.results);
  } catch (error) {
    console.error("Error usando Axios:", error);
    dataContainer.innerHTML = `<p>Error al obtener personajes con Axios: ${error.message}</p>`;
  }
}

fetchButton.addEventListener("click", fetchCharactersWithFetch);
axiosButton.addEventListener("click", fetchCharactersWithAxios);
