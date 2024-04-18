const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
}

function defaultCompare(a, b) {
  if (a < b) {
    return Compare.LESS_THAN;
  }
  if (a > b) {
    return Compare.BIGGER_THAN;
  }
  return 0;
}

function bubbleSort(array) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (defaultCompare(array[j], array[j+1]) === Compare.BIGGER_THAN) {
        swap(array, j, j+1)
      }
    }    
  }
  
  return array
}

function improvedBubbleSort(array) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) { // Adicionar o menos i garante que eu nao percorra os itens que ja foram ordenados
      if (defaultCompare(array[j], array[j+1]) === Compare.BIGGER_THAN) {
        swap(array, j, j+1)
      }
    }    
  }

  return array
}

function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]]
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }

  return array;
}

let unorderArray = createNonSortedArray(5);
console.log(unorderArray.join());
let arrayNormalBubbleSort = bubbleSort(unorderArray);
console.log(arrayNormalBubbleSort.join());


unorderArray = createNonSortedArray(5);
console.log(unorderArray.join());
let arrayImprovedBubbleSort = improvedBubbleSort(unorderArray);
console.log(arrayImprovedBubbleSort.join());
