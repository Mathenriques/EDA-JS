class Stack {
  constructor() {
    this.items = []
  }

  /*  
  *  Add the element on the top of the stack. 
  */
  push(element) {
    this.items.push(element);
  }


  /*
  * Removes the last item of the stack
  */
  pop() {
    this.items.pop();
  }

  /*
  * Return the last item of the stack
  */
  peek() {
    return this.items[this.items.length - 1];
  }

  /*
  * Checks if the stack is empty or not. If isEmpty returns true, if not false
  */
  isEmpty() {
    return this.items.length === 0;
  }

  /*
  * Reset the stack
  */
  clear() {
    this.items = [];
  }

  /*
  * Return the size of the stack
  */
  size() {
    return this.items.length
  }
}


const stack = new Stack();


stack.push("a");
stack.push("b");
stack.push("c");
console.log("Lista: ", stack.items);
console.log("Tamanho: ", stack.size());

stack.pop()
console.log("Tamanho após remoção pop: ", stack.size());
console.log("Lista após remoção pop: ", stack.items);
console.log("Último elemento: ", stack.peek());
console.log("Tamanho: ", stack.size());
console.log("Está vazia? ", stack.isEmpty());
stack.clear();
console.log("Está vazia? ", stack.isEmpty());
