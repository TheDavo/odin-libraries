////////////// BOOK CLASS //////////////

/**
 * Book class
 * @param {string} title
 * @param {string} author
 * @param {boolean} hasRead
 * @param {string} genre
 */

function Book(title, author, genre = 'Not Set', hasRead = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.hasRead = hasRead;
  //this.bookID = `${author}_${title}`;
  this.bookID = this._generateID(this.title, this.author);
}

Book.prototype._generateID = function (title, author) {
  title = title.toLowerCase();
  title = title.replace(' ', '-');

  author = author.toLowerCase();
  author = author.replace(' ', '-');

  return author.concat('_', title);
};

Book.prototype.changeReadStatus = function () {
  this.hasRead = !this.hasRead;
  console.log(this.hasRead);
  this.changeReadStatusDOM();
};

Book.prototype.changeReadStatusDOM = function () {
  const readButton = document.querySelector(`#${this.bookID} button`);
  if (readButton) {
    readButton.innerHTML = this.hasRead ? 'READ' : 'NOT READ';
    if (readButton.classList.contains('book-read')) {
      readButton.classList.remove('book-read');
      readButton.classList.add('book-not-read');
    } else {
      readButton.classList.add('book-read');
      readButton.classList.remove('book-not-read');
    }
  }
};
/**
 * Generates the HTML for a book
 * @returns {HTMLDivElement} The book's DOM representation
 */
Book.prototype.buildDOM = function () {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book');
  bookContainer.id = this.bookID;

  const authorP = document.createElement('p');
  const titleP = document.createElement('p');
  const genreP = document.createElement('p');
  const hasReadButton = document.createElement('button');
  hasReadButton.type = 'button';

  // Use arrow function here to make the 'this' refer to the Book class
  // Otherwise simply passing this.changeReadStatus refers
  // to the hasReadButton object's changeReadStatus function, which does not exist
  hasReadButton.addEventListener('click', () => {
    this.changeReadStatus();
  });

  titleP.innerHTML = this.title;
  titleP.classList.add('title');

  authorP.innerHTML = `by ${this.author}`;
  authorP.classList.add('author');

  genreP.innerHTML = this.genre;
  genreP.classList.add('genre');
  hasReadButton.innerHTML = this.hasRead ? 'READ' : 'NOT READ';
  hasReadButton.classList.add(this.hasRead ? 'book-read' : 'book-not-read');

  bookContainer.appendChild(titleP);
  bookContainer.appendChild(authorP);
  bookContainer.appendChild(genreP);
  bookContainer.appendChild(hasReadButton);
  return bookContainer;
};

////////////// LIBRARY CLASS //////////////

function Library() {
  this.container = document.querySelector('.library');
  this.library = [];
}

/**
 * Pushes the new book to the top of the library array and to the DOM
 *
 * @param {Book} newBook The book to add to the library
 * @return {boolean} The book entry is successful on a true return, false if the book already exists
 */
Library.prototype.addBookToLibrary = function (newBook) {
  //Check to see if the book is already in our library
  const alreadyHave = this.isInLibrary(newBook); // true if library already has the book

  if (!alreadyHave) {
    this.library.push(newBook);
    this.addBookToLibraryDOM(newBook);
    return true; // new book entry is successful
  }

  return false; //book already exists
};

Library.prototype.isInLibrary = function (newBook) {
  return (
    this.library.filter((book) => book.bookID == newBook.bookID).length != 0
  );
};

/**
 * Renders the book into the DOM using the book's buildDOM() function
 * @param {Book} book
 */
Library.prototype.addBookToLibraryDOM = function (book) {
  this.container.appendChild(book.buildDOM());
};

/**
 * Removes the book from the library completely
 * @param {string} bookID
 */
Library.prototype.removeBookFromLibrary = function (bookID) {
  this.library = this.library.filter((book) => {
    return book.bookID !== bookID;
  });
  this.removeBookFromLibraryDOM(bookID);
};

Library.prototype.removeAllBooks = function () {
  this.library = [];
  this.removeAllBooksDOM();
};

/**
 * Removes the book from the library container DOM
 * @param {string} bookID
 * @returns {boolean} Returns if the removal was successful
 */
Library.prototype.removeBookFromLibraryDOM = function (bookID) {
  const bookInDOM = this.container.children[bookID];
  if (bookInDOM) {
    this.container.removeChild(bookInDOM);
    return true;
  }

  return false;
};

Library.prototype.removeAllBooksDOM = function () {
  this.container.innerHTML = '';
};

let library = new Library();

////////////// USER INTERFACE //////////////

const addNewBookBtn = document.getElementById('add-new-book-btn');
const deleteAllBooksBtn = document.getElementById('delete-all-books-btn');
const addNewBookForm = document.querySelector('.new-book-form');
const snackbar = document.getElementById('snackbar');

// EVENT LISTENERS ON UI ELEMENTS
addNewBookBtn.addEventListener('click', () => {
  addNewBookForm.classList.toggle('active');
});

deleteAllBooksBtn.addEventListener('click', () => {
  library.removeAllBooks();
});

addNewBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(addNewBookForm);
  const title = formData.get('bookTitle');
  const author = formData.get('bookAuthor');
  const genre = formData.get('bookGenre');
  const hasRead = formData.get('hasReadBook');
  const newBook = new Book(title, author, genre, hasRead);
  if (!library.addBookToLibrary(newBook)) {
    showSnackbar(`${newBook.title} is already in your library!`);
  }
});

const showSnackbar = (message) => {
  snackbar.innerHTML = message;
  snackbar.classList.toggle('show');
  setTimeout(() => {
    snackbar.classList.toggle('show');
  }, 3000);
};
