export class Library {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    this.items = this.items.filter((i) => i !== item);
  }
  findItem(predicate) {
    return this.items.find(predicate);
  }
  getAllItems() {
    return this.items;
  }
}
//# sourceMappingURL=library.js.map
