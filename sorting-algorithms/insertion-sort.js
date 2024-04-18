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

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }

  return array;
}

function insertionSort(array) {
  const { length } = array
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i];
    
    while(j > 0 && defaultCompare(array[j-1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }

  return array
}

let unorderArray = createNonSortedArray(10);
console.log(unorderArray.join());
let arrayNormalBubbleSort = insertionSort(unorderArray);
console.log(arrayNormalBubbleSort.join());