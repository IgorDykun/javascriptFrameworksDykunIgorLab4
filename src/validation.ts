export class Validation {
  static isNumber(value: string): boolean {
    return /^\d+$/.test(value);
  }

  static isYear(value: string): boolean {
    return /^\d{4}$/.test(value);
  }

  static validateBook(book: any): boolean {
    return (
      this.isNumber(book.id) &&
      book.title &&
      book.author &&
      this.isYear(book.year)
    );
  }

  static validateUser(user: any): boolean {
    return this.isNumber(user.id) && user.name;
  }
}
