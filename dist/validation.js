export class Validation {
  static isNumber(value) {
    return /^\d+$/.test(value);
  }
  static isYear(value) {
    return /^\d{4}$/.test(value);
  }
  static validateBook(book) {
    return (
      this.isNumber(book.id) &&
      book.title &&
      book.author &&
      this.isYear(book.year)
    );
  }
  static validateUser(user) {
    return this.isNumber(user.id) && user.name;
  }
}
//# sourceMappingURL=validation.js.map
