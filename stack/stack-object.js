class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  /*  
  *  Add the element on the top of the stack. 
  */
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  /*
  * Return the size of the stack
  */
  size() {
    return this.count
  }

  /*
  * Checks if the stack is empty or not. If isEmpty returns true, if not false
  */
  isEmpty() {
    return this.count === 0;
  }

  /*
  * Reset the stack
  */
  clear() {
    this.items = {};
    this.count = 0;
  }

  /*
  * Removes the last item of the stack
  */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.count--;

    const result = this.items[this.count];

    delete this.items[this.count];

    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return ' ';
    }

    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
      
    }

    return objString;
  }
}

const stack = new Stack();


stack.push("a");
stack.push("b");
stack.push("c");
console.log("Lista: ", stack.toString());
console.log("Tamanho: ", stack.size());

stack.pop()
console.log("Tamanho após remoção pop: ", stack.size());
console.log("Lista após remoção pop: ", stack.toString());
console.log("Último elemento: ", stack.peek());
console.log("Tamanho: ", stack.size());
console.log("Está vazia? ", stack.isEmpty());
stack.clear();
console.log("Está vazia? ", stack.isEmpty());