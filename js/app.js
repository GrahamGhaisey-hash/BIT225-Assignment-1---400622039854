// ===== BlueLib Catalogue — app.js =====
// Holds the book data in memory (an array of objects) and handles
// rendering, searching, filtering, adding, and borrowing.

// Starting catalogue — at least 6 books, as required.
let books = [
  { id: 1, title: "Data Structures and Algorithms", author: "Robert Sedgewick", category: "IT", copies: 4 },
  { id: 2, title: "Principles of Marketing", author: "Philip Kotler", category: "Business", copies: 2 },
  { id: 3, title: "Introduction to Organic Chemistry", author: "William Brown", category: "Science", copies: 0 },
  { id: 4, title: "The Elements of Style", author: "William Strunk Jr.", category: "Arts", copies: 3 },
  { id: 5, title: "Database Systems", author: "Ramez Elmasri", category: "IT", copies: 1 },
  { id: 6, title: "Financial Accounting", author: "Jerry Weygandt", category: "Business", copies: 5 },
  { id: 7, title: "Physics for Scientists", author: "Raymond Serway", category: "Science", copies: 2 },
];

let nextId = books.length + 1;

// Cache the DOM elements we use repeatedly.
const bookListEl = document.getElementById("book-list");
const noResultsEl = document.getElementById("no-results");
const searchInputEl = document.getElementById("search-input");
const categoryFilterEl = document.getElementById("category-filter");
const addBookFormEl = document.getElementById("add-book-form");
const formErrorEl = document.getElementById("form-error");

// renderBooks: builds and inserts a card for every book that matches
// the current search text and category filter.
function renderBooks() {
  const searchTerm = searchInputEl.value.trim().toLowerCase();
  const selectedCategory = categoryFilterEl.value;

  const visibleBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  bookListEl.innerHTML = "";

  visibleBooks.forEach((book) => {
    bookListEl.appendChild(createBookCard(book));
  });

  noResultsEl.hidden = visibleBooks.length !== 0;
}

// createBookCard: builds a single card element for one book object.
function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "author";
  author.textContent = book.author;

  const categoryTag = document.createElement("span");
  categoryTag.className = "category-tag";
  categoryTag.textContent = book.category;

  const copies = document.createElement("p");
  copies.className = "copies";
  copies.textContent = book.copies > 0
    ? `Copies available: ${book.copies}`
    : "Out of stock";
  if (book.copies === 0) {
    copies.classList.add("out-of-stock");
  }

  const borrowBtn = document.createElement("button");
  borrowBtn.type = "button";
  borrowBtn.className = "btn btn-borrow";
  borrowBtn.textContent = book.copies > 0 ? "Borrow" : "Out of stock";
  borrowBtn.disabled = book.copies === 0;
  borrowBtn.addEventListener("click", () => borrowBook(book.id));

  card.append(title, author, categoryTag, copies, borrowBtn);
  return card;
}

// borrowBook: reduces the copy count for one book by 1 and re-renders.
function borrowBook(id) {
  const book = books.find((b) => b.id === id);
  if (!book || book.copies <= 0) {
    return;
  }
  book.copies -= 1;
  renderBooks();
}

// validateNewBook: checks the Add Book form values and returns an
// error message string, or an empty string if everything is valid.
function validateNewBook(title, author, category, copiesRaw) {
  if (!title || !author || !category || copiesRaw === "") {
    return "Please fill in every field before adding a book.";
  }

  const copies = Number(copiesRaw);
  if (!Number.isInteger(copies) || copies < 0) {
    return "Copies available must be a whole number of 0 or more.";
  }

  return "";
}

// handleAddBook: reads the form, validates it, and — if valid —
// pushes a new book into the array and re-renders the grid.
function handleAddBook(event) {
  event.preventDefault();

  const title = document.getElementById("title-input").value.trim();
  const author = document.getElementById("author-input").value.trim();
  const category = document.getElementById("category-input").value;
  const copiesRaw = document.getElementById("copies-input").value;

  const errorMessage = validateNewBook(title, author, category, copiesRaw);

  if (errorMessage) {
    formErrorEl.textContent = errorMessage;
    formErrorEl.hidden = false;
    return;
  }

  formErrorEl.hidden = true;

  books.push({
    id: nextId,
    title,
    author,
    category,
    copies: Number(copiesRaw),
  });
  nextId += 1;

  addBookFormEl.reset();
  renderBooks();
}

// ===== Event listeners =====
searchInputEl.addEventListener("input", renderBooks);
categoryFilterEl.addEventListener("change", renderBooks);
addBookFormEl.addEventListener("submit", handleAddBook);

// Initial render on page load.
renderBooks();
