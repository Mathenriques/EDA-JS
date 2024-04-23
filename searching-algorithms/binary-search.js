const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
}

function defaultCompare(a, b) {
  if (a < b) {
    return Compare.LESS_THAN;
  }
  if (a > b) {
    return Compare.BIGGER_THAN;
  }
  return Compare.EQUALS;
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

function quickSort(array) {
  return quick(array, 0, array.length - 1);
}

function quick(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      quick(array, left, index - 1)
    }

    if (index < right) {
      quick(array, index, right);
    }
  }

  return array;
}

function partition(array, left, right) {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while( i <= j) {
    while(defaultCompare(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }

    while(defaultCompare(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }

    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }

  }
  return i;
}


function binarySearch(array, value) {
  const sortedArray = quickSort(array);
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    if (defaultCompare(element, value) === Compare.LESS_THAN) {
      console.log("Direita")
      low = mid + 1;
    } else if (defaultCompare(element, value) === Compare.BIGGER_THAN) {
      console.log("Esquerda")
      high = mid - 1;
    } else {
      console.log("Igual")
      return mid;
    }
  }

  return -1;
}

let array = createNonSortedArray(20);
binarySearch(array,  9);

// Buscando o número 9.
// 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 => mid = 10
// 1,2,3,4,5,6,7,8,9 => mid = 5
// 6,7,8,9 => mid = 7
// 8,9 => mid = 8
// 9 => mid = 9
