const arrayInput = ['aa', 'c', 'b', 'aa', 'b', 'aba', 'aaa', 'baa'];

function normalizeString(str) {
  return str.split('').sort().join('');
}

function groupCharacters(array) {
  const map = {};

  for (let item of array) {
    const normalized = normalizeString(item);
    if (!map[normalized]) {
      map[normalized] = [];
    }
    map[normalized].push(item);
  }

  return Object.values(map);
}

console.log(groupCharacters(arrayInput));
