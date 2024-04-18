class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = this.equalsFn();
  }

  equalsFn(a, b) {
    return a === b
  }

  push(element) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }

      current.next = node;
    }

    this.count++;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        this.head = this.head.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }
    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head;

      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }

    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index < this.count) {
      const node = new Node(element);
      
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }      
      current = current.next;
    }

    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) {
      return ' ';
    }

    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 0; i < this.count && current != null; i++) {
      objString = `${objString}, ${current.element}`
      current = current.next;
    }

    return objString;
  }
}

const linkedList = new LinkedList();

linkedList.push(12);
linkedList.push(1);
linkedList.push(2);
linkedList.push(100);
linkedList.removeAt(1);
let element = linkedList.getElementAt(0);
console.log(element);
console.log(linkedList.toString())

// Lista Duplamente Ligada
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = undefined;
  }
}