import { Book, User } from './models.js';
import { LibraryService } from './services.js';
import { Modal } from './modal.js';
import { Validation } from './validation.js';
class App {
  constructor() {
    this.libraryService = new LibraryService();
    this.initEventListeners();
    this.renderBooks();
    this.renderUsers();
  }
  initEventListeners() {
    const addBookForm = document.getElementById('addBookForm');
    const addUserForm = document.getElementById('addUserForm');
    addBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
    });
    addUserForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addUser();
    });
  }
  addBook() {
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = document.getElementById('bookYear').value;
    if (Validation.validateBook({ id, title, author, year })) {
      const book = new Book(Number(id), title, author, Number(year));
      this.libraryService.addBook(book);
      this.renderBooks();
      Modal.show('Книгу додано успішно!');
    } else {
      Modal.show('Помилка валідації даних книги.');
    }
  }
  addUser() {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    if (Validation.validateUser({ id, name })) {
      const user = new User(Number(id), name);
      this.libraryService.addUser(user);
      this.renderUsers();
      Modal.show('Користувача додано успішно!');
    } else {
      Modal.show('Помилка валідації даних користувача.');
    }
  }
  renderBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    const books = this.libraryService.getAllBooks();
    const users = this.libraryService.getAllUsers();
    books.forEach((book) => {
      const li = document.createElement('li');
      li.className =
        'list-group-item d-flex justify-content-between align-items-center';
      const buttonText = book.isBorrowed ? 'Повернути' : 'Взяти';
      li.innerHTML = `
                ${book.title} by ${book.author} (${book.year})
                <select class="form-select" id="userSelect-${book.id}">
                    <option value="">Виберіть користувача</option>
                    ${users.map((user) => `<option value="${user.id}">${user.name}</option>`).join('')}
                </select>
                <div>
                    <button class="btn btn-primary ms-2" data-book-id="${book.id}" data-borrowed="${book.isBorrowed}">${buttonText}</button>
                </div>
            `;
      bookList.appendChild(li);
    });
    const buttons = bookList.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        var _a;
        const bookId = Number(event.target.getAttribute('data-book-id'));
        const select =
          (_a = button.parentElement) === null || _a === void 0
            ? void 0
            : _a.previousElementSibling;
        const userId = select.value;
        if (button.getAttribute('data-borrowed') === 'true') {
          this.returnBook(bookId);
        } else {
          this.borrowBook(bookId, userId);
        }
      });
    });
  }
  returnBook(bookId) {
    this.libraryService.returnBook(bookId);
    this.renderBooks();
    Modal.show('Книгу повернено.');
  }
  renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    const users = this.libraryService.getAllUsers();
    users.forEach((user) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `${user.name} (ID: ${user.id})`;
      userList.appendChild(li);
    });
  }
  borrowBook(bookId, userId) {
    const user = this.libraryService
      .getAllUsers()
      .find((u) => u.id === Number(userId));
    if (user) {
      if (this.libraryService.borrowBook(bookId)) {
        this.renderBooks();
        Modal.show(`${user.name} взяв книгу.`);
      } else {
        Modal.show('Не вдалося взяти книгу.');
      }
    } else {
      Modal.show('Будь ласка, виберіть користувача.');
    }
  }
}
const appInstance = new App();
document.addEventListener('DOMContentLoaded', () => {
  appInstance.renderBooks();
});
//# sourceMappingURL=app.js.map
