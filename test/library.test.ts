import { expect } from 'chai';
import { Library } from '../src/library';
import { Book } from '../src/models';

describe('Library', () => {
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>();
  });

  it('should add a book', () => {
    const book = new Book(1, 'Test Book', 'Author', 2021);
    library.addItem(book);
    expect(library.getAllItems()).to.include(book);
  });

  it('should remove a book', () => {
    const book = new Book(1, 'Test Book', 'Author', 2021);
    library.addItem(book);
    library.removeItem(book);
    expect(library.getAllItems()).to.not.include(book);
  });

  it('should find a book', () => {
    const book = new Book(1, 'Test Book', 'Author', 2021);
    library.addItem(book);
    const foundBook = library.findItem((b) => b.id === book.id);
    expect(foundBook).to.equal(book);
  });

  it('should return all books', () => {
    const book1 = new Book(1, 'Test Book 1', 'Author 1', 2021);
    const book2 = new Book(2, 'Test Book 2', 'Author 2', 2022);
    library.addItem(book1);
    library.addItem(book2);
    expect(library.getAllItems()).to.include(book1);
    expect(library.getAllItems()).to.include(book2);
  });
});
