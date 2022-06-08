class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // ! Method to get the size of the link list
  /**
   * @returns {number}
   */
  getSize() {
    let node = this.head;
    let counter = 0;
    while (node) {
      counter++;
      node = node.next;
    }
    return counter;
  }

  // ! Method to get Index of node.
  /**
   * @param {*} value
   * @returns {number}
   */
  getIndex(value) {
    let node = this.head;
    let count = 0;
    while (node.value !== value) {
      node = node.next;
      if (!node) return -1;
      count++;
    }

    return count;
  }

  // ! Method to get node at given index
  /**
   * @param {number} index
   * @returns {Node}
   */
  getNodeByIndex(index) {
    let listSize = this.getSize();
    if (index < 0 || index > listSize - 1) return null;
    else if (index === 0) return this.head;
    else if (index === listSize - 1) return this.tail;
    else {
      let node = this.head;
      let count = 0;
      while (count !== index) {
        node = node.next;
        count++;
      }

      return node;
    }
  }

  // ! Method to get a node by value.
  /**
   * @param {*} value
   * @returns {Node}
   */
  getNodeByValue(value) {
    if (this.head.value === value) return this.head;

    let node = this.head;
    while (node.value !== value) {
      node = node.next;

      if (!node) return null;
    }

    return node;
  }

  // ! Method to add a new node at the start of the LL.
  /**
   * @param {*} value
   * @returns {LinkedList}
   */
  prepend(value) {
    this.head = new Node(value, this.head);
    if (!this.tail) {
      this.tail = this.head;
    }

    return this;
  }

  // ! Method to add a new node at the end of the LL.
  /**
   *
   * @param {*} value
   * @returns {LinkedList}
   */
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    return this;
  }

  // ! Method to insert a new node at a given index
  /**
   * @param {*} value
   * @param {number*} index
   * @returns {LinkedList}
   */
  insert(value, index = Infinity) {
    if (index < 1) this.prepend(value);
    else if (index >= this.getSize()) this.append(value);
    else {
      const node = this.getNodeByIndex(index - 1);
      node.next = new Node(value, node.next);
    }

    return this;
  }

  // ! Method to delete first node in the LL.
  /**
   * @returns {Node}
   */
  deleteHead() {
    if (!this.head) return null;
    const deletedNode = this.head;
    if (!deletedNode.next) this.clear();
    else {
      this.head = deletedNode.next;
    }

    deletedNode.next = null;
    return deletedNode;
  }

  // ! Method to delete last node of the LL
  /**
   * @returns {Node}
   */
  deleteTail() {
    if (!this.head) return null;

    const removedNode = this.tail;

    if (this.head === this.tail) this.clear();
    else {
      let node = this.head;
      while (node.next !== this.tail) {
        //getting second last node
        node = node.next;
      }
      node.next = null;
      this.tail = node;
      removedNode.next = null;
    }
    return removedNode;
  }

  // ! Method to delete a node with given index
  /**
   *
   * @param {number} index
   * @returns {Node}
   */
  deleteNodeByIndex(index) {
    let listSize = this.getSize();
    if (index < 0 || index > listSize - 1) return null;
    else if (index === 0) return this.deleteHead();
    else if (index === listSize - 1) return this.deleteTail();
    else {
      let node = this.getNodeByIndex(index - 1); //getting prev  node
      const removedNode = node.next;
      node.next = removedNode.next;
      removedNode.next = null;

      return removedNode;
    }
  }

  // ! Method to delete a node by value
  /**
   * @param {*} value
   * @returns {Node}
   */
  deleteNodeByValue(value) {
    const index = this.getIndex(value);
    if (index === -1) return null;

    const prevNode = this.getNodeByIndex(index - 1);

    if (!prevNode) return this.deleteHead();

    const removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    removedNode.next = null;

    return removedNode;
  }

  // ! Method to update node
  /**
   * @param {*} value
   * @param {number} index
   * @returns
   */
  updateNode(value, index) {
    const node = this.getNodeByIndex(index);
    if (!node) return null;
    node.value = value;

    return node;
  }

  // ! Method to check if certain value exist or not
  /**
   * @param {*} value
   * @returns {boolean}
   */
  contains(value) {
    const node = this.getNodeByValue(value);
    return node ? true : false;
  }

  // ! Method to convert an array to a Link list.
  /**
   * @param {[*]} arr
   * @returns {LinkedList}
   */
  fromArray(arr) {
    arr.forEach((el) => this.insert(el));
    return this;
  }

  // ! Method to convert a link list into an array.
  /**
   * @returns {Node[]}
   */
  toArray() {
    const nodes = [];
    let node = this.head;
    while (node) {
      nodes.push(node);
      node = node.next;
    }
    return nodes;
  }

  //! To loop over
  /**
   * @param {callback} fn
   */
  forEach(fn) {
    let node = this.head;
    let counter = 0;

    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  // ! Method to delete all the nodes.
  clear() {
    this.head = null;
    this.tail = null;
  }

  //!
  /**
   *
   * @returns {Linklist}
   */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  // ! Method to get all the values as an array
  print() {
    const arr = [];
    let node = this.head;
    while (node) {
      arr.push(node.value);
      node = node.next;
    }

    console.log(arr);
  }
}

const list = new LinkedList();

list.insert(10);
list.append(30);
list.append(40);
list.prepend(5);
list.print();
list.reverse();
list.print();

// console.log(list.deleteTail());

// console.log(list.fromArray([5, 10, 15, 20]));

// console.log(list.toArray());
