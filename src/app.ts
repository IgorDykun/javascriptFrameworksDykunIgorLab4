import { Book, User } from './models.js';
import { LibraryService } from './services.js';
import { Modal } from './modal.js';
import { Validation } from './validation.js';

class App {
  public libraryService: LibraryService;

  constructor() {
    this.libraryService = new LibraryService();
    this.initEventListeners();
    this.renderBooks();
    this.renderUsers();
  }

  private initEventListeners(): void {
    const addBookForm = document.getElementById(
      'addBookForm',
    ) as HTMLFormElement;
    const addUserForm = document.getElementById(
      'addUserForm',
    ) as HTMLFormElement;

    addBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
    });

    addUserForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addUser();
    });
  }

  private addBook(): void {
    const id = (document.getElementById('bookId') as HTMLInputElement).value;
    const title = (document.getElementById('bookTitle') as HTMLInputElement)
      .value;
    const author = (document.getElementById('bookAuthor') as HTMLInputElement)
      .value;
    const year = (document.getElementById('bookYear') as HTMLInputElement)
      .value;

    if (Validation.validateBook({ id, title, author, year })) {
      const book = new Book(Number(id), title, author, Number(year));
      this.libraryService.addBook(book);
      this.renderBooks();
      Modal.show('Книгу додано успішно!');
    } else {
      Modal.show('Помилка валідації даних книги.');
    }
  }

  private addUser(): void {
    const id = (document.getElementById('userId') as HTMLInputElement).value;
    const name = (document.getElementById('userName') as HTMLInputElement)
      .value;

    if (Validation.validateUser({ id, name })) {
      const user = new User(Number(id), name);
      this.libraryService.addUser(user);
      this.renderUsers();
      Modal.show('Користувача додано успішно!');
    } else {
      Modal.show('Помилка валідації даних користувача.');
    }
  }

  public renderBooks(): void {
    const bookList = document.getElementById('bookList') as HTMLUListElement;
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
        const bookId = Number(
          (event.target as HTMLButtonElement).getAttribute('data-book-id'),
        );
        const select = button.parentElement
          ?.previousElementSibling as HTMLSelectElement;
        const userId = select.value;

        if (button.getAttribute('data-borrowed') === 'true') {
          this.returnBook(bookId);
        } else {
          this.borrowBook(bookId, userId);
        }
      });
    });
  }

  public returnBook(bookId: number): void {
    this.libraryService.returnBook(bookId);
    this.renderBooks();
    Modal.show('Книгу повернено.');
  }

  public renderUsers(): void {
    const userList = document.getElementById('userList') as HTMLUListElement;
    userList.innerHTML = '';
    const users = this.libraryService.getAllUsers();

    users.forEach((user) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `${user.name} (ID: ${user.id})`;
      userList.appendChild(li);
    });
  }

  public borrowBook(bookId: number, userId: string): void {
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
