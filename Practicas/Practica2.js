const inventoryContainer = document.getElementById('inventory-container');
const loadInventoryButton = document.getElementById('load-inventory');
const addBookButton = document.getElementById('add-book-button');
const searchBookButton = document.getElementById('search-book-button');
const showAllButton = document.getElementById('show-all-button');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const genreInput = document.getElementById('genre-input');
const availabilityInput = document.getElementById('availability-input');
const searchTitleInput = document.getElementById('search-title-input');

const libraryData = {
  books: [
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Realismo mágico', disponible: true },
    { titulo: '1984', autor: 'George Orwell', genero: 'Distopía', disponible: false },
    { titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', genero: 'Fantasía', disponible: true },
  ],
};

function simulateReadJSON(data, callback) {
  setTimeout(() => {
    const copiedData = JSON.parse(JSON.stringify(data));
    callback(copiedData);
  }, 800);
}

function simulateWriteJSON(data, callback) {
  setTimeout(() => {
    callback(data);
  }, 800);
}

function renderInventory(data) {
  inventoryContainer.innerHTML = '';

  if (!data.books || data.books.length === 0) {
    inventoryContainer.innerHTML = '<p>No hay libros en el inventario.</p>';
    return;
  }

  data.books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <span><strong>Título:</strong> ${book.titulo}</span>
      <span><strong>Autor:</strong> ${book.autor}</span>
      <span><strong>Género:</strong> ${book.genero}</span>
      <span class="status ${book.disponible ? 'disponible' : 'no-disponible'}">
        ${book.disponible ? 'Disponible' : 'No disponible'}
      </span>
    `;

    inventoryContainer.appendChild(card);
  });
}

function loadInventory(callback) {
  simulateReadJSON(libraryData, (data) => {
    renderInventory(data);
    if (callback) callback(data);
  });
}

function addBook(book, callback) {
  libraryData.books.push(book);
  simulateWriteJSON(libraryData, (updatedData) => {
    renderInventory(updatedData);
    if (callback) callback(updatedData);
  });
}

function updateBookAvailability(title, disponible, callback) {
  const book = libraryData.books.find((item) => item.titulo.toLowerCase() === title.toLowerCase());

  if (!book) {
    alert('No se encontró un libro con ese título.');
    if (callback) callback(null);
    return;
  }

  book.disponible = disponible;
  simulateWriteJSON(libraryData, (updatedData) => {
    renderInventory(updatedData);
    if (callback) callback(updatedData);
  });
}

function getInventory() {
  return libraryData.books;
}

function findBookByTitle(title) {
  return libraryData.books.filter((item) => item.titulo.toLowerCase().includes(title.toLowerCase()));
}

loadInventory();

loadInventoryButton.addEventListener('click', () => {
  loadInventory();
});

addBookButton.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const genre = genreInput.value.trim();
  const disponible = availabilityInput.value === 'true';

  if (!title || !author || !genre) {
    alert('Por favor completa todos los campos para agregar un libro.');
    return;
  }

  const newBook = { titulo: title, autor: author, genero: genre, disponible };
  addBook(newBook, () => {
    titleInput.value = '';
    authorInput.value = '';
    genreInput.value = '';
    availabilityInput.value = 'true';
  });
});

searchBookButton.addEventListener('click', () => {
  const searchTerm = searchTitleInput.value.trim();

  if (!searchTerm) {
    alert('Ingresa un título para buscar.');
    return;
  }

  const foundBooks = findBookByTitle(searchTerm);
  renderInventory({ books: foundBooks });
});

showAllButton.addEventListener('click', () => {
  renderInventory(libraryData);
});
