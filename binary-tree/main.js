const Compare = {
  LESS_THAN: -1,
  MORE_THAN: 1,
}

function defaultCompare(a, b) {
  if (a < b) {
    return Compare.LESS_THAN;
  }
  if (a > b) {
    return Compare.MORE_THAN;
  }
  return 0;
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinaryTreeSearch {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }

    return node;
  }

  inOrderTraverse(callback) {
    console.log('Em Ordem (Menor para o maior):  ')
    this.inOrderTraverseNode(this.root, callback)
  }

  preOrderTraverse(callback) {
    console.log('Pré Ordem (Pai para filhos):  ')
    this.preOrderTraverseNode(this.root, callback)
  }

  postOrderTraverse(callback) {
    console.log('Pós Ordem (Filhos para pai):  ')
    this.postOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback); // Buscando o mais a esquerda
      callback(node.key) // Printa o nó
      this.inOrderTraverseNode(node.right, callback); // Buscando o mais a direita
    }
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key) // Printa o nó
      this.preOrderTraverseNode(node.left, callback); // Buscando o mais a esquerda
      this.preOrderTraverseNode(node.right, callback); // Buscando o mais a esqueda
    }
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback); // Buscando o mais a esquerda
      this.postOrderTraverseNode(node.right, callback); // Buscando o mais a esqueda
      callback(node.key) // Printa o nó
    }
  }

  min() {
    return this.minNode(this.root);
  }

  max() {
    return this.maxNode(this.root);
  }

  minNode(node) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }

    console.log(current.key)
  }

  maxNode(node) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }

    console.log(current.key)
  }

  search(key) {
    const result = this.searchNode(this.root, key);
    result ? console.log(`Value (${key}), encontrado`) : console.log(`Value (${key}), não encontrado`);
  }

  searchNode(node, key) {
    if (node === null) {
      return false
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.MORE_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node === null) {
      return false
    }

    // Bucando onde está o novo com valor de key
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.searchNode(node.left, key) // Atualização das referências dos ponteiros da esqueda 
      return node;
    } else if (this.compareFn(key, node.key) === Compare.MORE_THAN) {
      node.right = this.searchNode(node.right, key) // Atualização das referências dos ponteiros da direita
      return node;
    } else {
      // Achamos o nó com valor de key
      if (node.left === null && node.right === null) { // Nó sem filhos, atribuindo valor null para ele
        node = null;
        return node; // Devolvemos null para atribuir null à sua referencia em seu nó pai
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Remover um nó com 2 filhos
      const aux = this.minNode(node.right); // Buscar o nó minimo da arvore a direita
      node.key = aux.key; // Substituir o valor a ser removido pelo minimo encontrado
      node.rigth = this.removeNode(node.right, aux.key); // Remover o nó minimo da subárvore
      return node; // Devolve a referencia atualizando o nó pai
    }
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }

    return Math.max(
      this.getNodeHeight(node.left), this.getNodeHeight(node.right)
    )
  }
}


/// Criação da Arvore Binária
const tree = new BinaryTreeSearch();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

const printNode = (value) => console.log(value); // callback
tree.inOrderTraverse(printNode);
tree.preOrderTraverse(printNode);
tree.postOrderTraverse(printNode);
tree.min()
tree.max()
tree.search(6)


// Arvores autobalanceada => AVL

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
}

class AVLTree extends BinaryTreeSearch {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getBalanceFactor(node) {
    const heightDiff = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    
    switch(heightDiff) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.BALANCED;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
    }
  }

  rotationLL(node) {
    const temp = node.left;
    node.left = temp.rigth;
    temp.right = node;

    return temp;
  }
  
  rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;

    return temp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationRR(node)
  }
  
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node)
  }

  insertNode(node, key) {
    node = super.insertNode(node, key);

    if (node === null) {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node); // Validando se precisa de balanceamento

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // Lado esquerdo desbalanceado
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { // Verifica se a chave à esquerda é menor que a chave do filho à esquerda
        node = this.rotationLL(node);
      } else { 
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // Lado direito desbalanceado
      if (this.compareFn(key, node.right.key) === Compare.MORE_THAN) { // Verificar se a chave à direito é maior que a chave do filho à direito
        node = this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }

    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);

    if (node === null) {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node); // Validando se precisa de balanceamento

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // Lado esquerdo desbalanceado
      const balanceFactorLeft = this.getBalanceFactor(node.left);

      if (
        balanceFactorLeft === BalanceFactor.BALANCED || 
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) { // Subárvore da Esquerda está desbalanceada para esquerda
        return this.rotationLL(node);
      }

      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) { // Subárvore da Esquerda está desbalanceada para direita
        return this.rotationLR(node.left);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // Lado Direito desbalanceado
      const balanceFactorRight = this.getBalanceFactor(node.right);

      if (
        balanceFactorRight === BalanceFactor.BALANCED || 
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) { // Subárvore da Direita está desbalanceada para a Direita
        return this.rotationRR(node);
      }

      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) { // Subárvore da Direita está desbalanceada para a esquerda
        return this.rotationRL(node.left);
      }
    }

    return node;
  }

}

console.log("-------------------------")
console.log("AVL TREE")
const avlTree = new AVLTree()

avlTree.insert(70)
avlTree.insert(71)
avlTree.insert(60)
avlTree.insert(99)
avlTree.insert(5)

avlTree.remove(60)
