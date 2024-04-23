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


function interpolationSearch(array, value) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;

  array = quickSort(array);
  while (
    low <= high && 
    value >= array[low] && 
    value <= array[high]
  ) {
    delta = (value - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta);
    
    if (array[position] === value) {
      console.log('Igual')
      return position;
    }

    if (defaultCompare(array[position], value) === Compare.LESS_THAN) {
      console.log("Direita")
      low = position + 1
    } else {
      console.log("Esquerda")
      high = position - 1;
    }
  }

  return -1;
}

let array = createNonSortedArray(200);
console.log(interpolationSearch(array,  7));

