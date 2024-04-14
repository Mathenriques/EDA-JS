class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0; // To get the first item on the Queue
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }


    return this.items[this.lowestCount];
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

const queue = new Queue();

queue.enqueue('Pedro');
queue.enqueue('Sabrina');
queue.enqueue('Matheus');
console.log(queue.peek())
console.log(queue.toString())
queue.dequeue()
console.log(queue.toString())
queue.dequeue()
console.log(queue.toString())
console.log(queue.isEmpty())


function hotPotato(elementsList, num) {
  const queue = new Queue();
  const eliminatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // Remove an item from start and add to the end
    }
    eliminatedList.push(queue.dequeue());
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  };
}

const names = ['Matheus', 'Pedro', 'Rafael', 'Leonardo', 'Camila'];
const result = hotPotato(names, 11);
result.eliminated.forEach(name => {
  console.log(`${name} was eliminated from Hot Potato`);
})
console.log(`${result.winner} won the game!`)