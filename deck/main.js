class Deck {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) { // If Deck is empty, add back
      this.addBack(element);
    }

    if (this.lowestCount > 0) { // If an element was removed from the front => lowestCount >= 1
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      // This case, lowestCount = 0; So for not add negative keys, we upgrade the key in 1; At the the end the first key is free to use
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }

      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.count--;

    const result = this.items[this.count];

    delete this.items[this.count];

    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }


    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }


  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return ' ';
    }

    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }

    return objString;
  }
}

const deck = new Deck();

console.log(deck.isEmpty());
deck.addBack('João');
deck.addBack('Camila');
deck.addBack('Matheus');
console.log(deck.toString());
console.log(deck.size());
deck.removeFront()
console.log(deck.toString());
deck.removeBack()
console.log(deck.toString());
deck.addFront('Matheus')
console.log(deck.toString());

