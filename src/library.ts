export class Library<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  findItem(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  getAllItems(): T[] {
    return this.items;
  }
}
