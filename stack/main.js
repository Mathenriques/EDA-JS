class Stack {
  constructor() {
    this.items = []
  }
}


const stack = new Stack();


stack.items.push("a");
stack.items.push("b");
stack.items.push("c");
console.log(stack.items);

stack.items.pop()
console.log(stack.items);
