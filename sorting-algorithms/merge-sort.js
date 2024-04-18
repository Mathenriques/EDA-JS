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

function mergeSort(array) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length/2);
    const right = mergeSort(array.slice(0, middle));
    const left = mergeSort(array.slice(middle, length));

    array = merge(left, right);
  }

  return array;
}

function merge(left, right) {
  const result = []
  let i = 0;
  let j = 0;

  while(i < left.length && j < right.length) {
    result.push(
      defaultCompare(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
    );
  }

  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

let unorderArray = createNonSortedArray(10);
console.log(unorderArray.join());
let arrayNormalBubbleSort = mergeSort(unorderArray);
console.log(arrayNormalBubbleSort.join());