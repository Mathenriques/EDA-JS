class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  hashCode(key) {
    // return this.loseloseHashCode(key);
    return this.djb2HashCode(key);
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }

    const tableKey = this.toString(key);
    let hash = 0; // Recebe a soma dos caracteres hash
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  djb2HashCode(key) {
    const tableKey = this.toString(key);
    let hash = 5381 // Número primo
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  toString(item) {
    if (item === null) {
      return 'NULL';
    } else if (item === undefined) {
      return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`
    }

    return item.toString()
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);

      return true;
    }

    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
}

const hash = new HashTable();
hash.put('Matheus', 'matheus@email.com');
hash.put('Pedro', 'pedro@email.com');
hash.put('Camila', 'camila@email.com');
hash.put('Joao', 'joao@email.com');

console.log(hash.hashCode('Nathan'), hash.hashCode('Sargeras'));
console.log(hash.loseloseHashCode('Nathan'), hash.loseloseHashCode('Sargeras'));
