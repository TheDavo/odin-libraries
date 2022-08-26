/**
 * Book class
 * @param {string} title
 * @param {string} author
 * @param {boolean} hasRead
 */

function Book(title, author, hasRead) {
  this.title = title;
  this.author = author;
  this.hasRead = hasRead;
  this.bookID = `${author}_${title}`;
}

Book.prototype.changeReadStatus = function (status) {
  this.hasRead = status;
};

function Library() {
  this.library = [];
}

/**
 * Pushes the new book to the top of the library array
 * @param {Book} book book to add to the library
 */
Library.prototype.addBookToLibrary = function (book) {
  this.library.push(book);
};

let library = new Library();
