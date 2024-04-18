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

let unorderArray = createNonSortedArray(5);
console.log(unorderArray.join());
array = quickSort(unorderArray);
console.log(array.join())