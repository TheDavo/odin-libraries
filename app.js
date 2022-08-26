////////////// BOOK CLASS //////////////

/**
 * Book class
 * @param {string} title
 * @param {string} author
 * @param {boolean} hasRead
 * @param {string} genre
 */

function Book(title, author, hasRead, genre) {
  this.title = title;
  this.author = author;
  this.hasRead = hasRead;
  this.genre = genre;
  this.bookID = `${author}_${title}`;
}

Book.prototype.changeReadStatus = function (status) {
  this.hasRead = status;
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

  authorP.innerHTML = this.author;
  titleP.innerHTML = this.title;
  genreP.innerHTML = this.genre;
  hasReadButton.innerHTML = this.hasRead ? 'READ' : 'NOT READ';

  bookContainer.appendChild(authorP);
  bookContainer.appendChild(titleP);
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
  const alreadyHave =
    this.library.filter((book) => book.bookID == newBook.bookID).length != 0; // true if library already has the book

  if (!alreadyHave) {
    this.library.push(newBook);
    this.addBookToLibraryDOM(newBook);
    return true; // new book entry is successful
  }

  return false; //book already exists
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
