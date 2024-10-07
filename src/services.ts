import { Book, User } from './models.js';
import { Library } from './library.js';
import { Storage } from './storage.js';
import { Modal } from './modal.js';

export class LibraryService {
  private bookLibrary: Library<Book>;
  private userLibrary: Library<User>;

  constructor() {
    this.bookLibrary = new Library<Book>();
    this.userLibrary = new Library<User>();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const books = Storage.load<Book[]>('books') || [];
    const users = Storage.load<User[]>('users') || [];
    books.forEach((book) => this.bookLibrary.addItem(book));
    users.forEach((user) => this.userLibrary.addItem(user));
  }

  private saveToStorage(): void {
    Storage.save('books', this.bookLibrary.getAllItems());
    Storage.save('users', this.userLibrary.getAllItems());
  }

  public addBook(book: Book): void {
    this.bookLibrary.addItem(book);
    this.saveToStorage();
  }

  public addUser(user: User): void {
    this.userLibrary.addItem(user);
    this.saveToStorage();
  }

  public borrowBook(bookId: number): boolean {
    const book = this.bookLibrary.findItem((b) => b.id === bookId);
    if (book && !book.isBorrowed) {
      book.isBorrowed = true; // Позначити книгу як взяту
      this.saveToStorage(); // Зберегти зміни
      return true;
    } else {
      Modal.show('Книга вже взята або не існує.');
      return false;
    }
  }

  public returnBook(bookId: number): void {
    const book = this.bookLibrary.findItem((b) => b.id === bookId);
    if (book && book.isBorrowed) {
      book.isBorrowed = false;
      this.saveToStorage();
    } else {
      Modal.show('Книга не була взята.');
    }
  }

  public getAllBooks(): Book[] {
    return this.bookLibrary.getAllItems();
  }

  public getAllUsers(): User[] {
    return this.userLibrary.getAllItems();
  }
}
