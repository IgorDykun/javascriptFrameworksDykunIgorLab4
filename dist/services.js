import { Library } from './library.js';
import { Storage } from './storage.js';
import { Modal } from './modal.js';
export class LibraryService {
  constructor() {
    this.bookLibrary = new Library();
    this.userLibrary = new Library();
    this.loadFromStorage();
  }
  loadFromStorage() {
    const books = Storage.load('books') || [];
    const users = Storage.load('users') || [];
    books.forEach((book) => this.bookLibrary.addItem(book));
    users.forEach((user) => this.userLibrary.addItem(user));
  }
  saveToStorage() {
    Storage.save('books', this.bookLibrary.getAllItems());
    Storage.save('users', this.userLibrary.getAllItems());
  }
  addBook(book) {
    this.bookLibrary.addItem(book);
    this.saveToStorage();
  }
  addUser(user) {
    this.userLibrary.addItem(user);
    this.saveToStorage();
  }
  borrowBook(bookId) {
    const book = this.bookLibrary.findItem((b) => b.id === bookId);
    if (book && !book.isBorrowed) {
      book.isBorrowed = true;
      this.saveToStorage();
      return true;
    } else {
      Modal.show('Книга вже взята або не існує.');
      return false;
    }
  }
  returnBook(bookId) {
    const book = this.bookLibrary.findItem((b) => b.id === bookId);
    if (book && book.isBorrowed) {
      book.isBorrowed = false;
      this.saveToStorage();
    } else {
      Modal.show('Книга не була взята.');
    }
  }
  getAllBooks() {
    return this.bookLibrary.getAllItems();
  }
  getAllUsers() {
    return this.userLibrary.getAllItems();
  }
}
//# sourceMappingURL=services.js.map
