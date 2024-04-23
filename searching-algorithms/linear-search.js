function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }

  return array;
}

function linearSearch(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      console.log(`Valor ${value} encontrado na posição ${i} do array`);
      return i;
    }
  }

  return -1;
}

let array = createNonSortedArray(5);
linearSearch(array, 3);
