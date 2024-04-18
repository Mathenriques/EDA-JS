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

function selectionSort(array) {
  const { length } = array;
  let indexMin;
  for (let i = 0; i < length; i++) {
    indexMin = i;
    for (let j = 0; j < length; j++) {
      if (defaultCompare(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;        
      }
    }

    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }

  return array
}

let unorderArray = createNonSortedArray(5);
console.log(unorderArray.join());
array = selectionSort(unorderArray);
console.log(array.join())