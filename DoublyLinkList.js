class Node {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  //! To get the length of the link list
  getSize() {
    let count = 0;
    let node = this.head;

    while (node) {
      node = node.next;
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
    if (!this.head) {
      this.head = new Node(value);
      this.tail = this.head;
    } else {
      const node = this.head;
      this.head = new Node(value, node);
      node.prev = this.head;
    }

    return this;
  }

  // ! Method to add a new node at the end of the LL.
  /**
   * @param {*} value
   * @returns {LinkedList}
   */
  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      this.tail = this.head;
    } else {
      const node = this.tail;
      const newNode = new Node(value, null, node);
      node.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  // ! Method to insert a new node at a given index
  /**
   * @param {*} value
   * @param {number*} index
   * @returns {LinkedList}
   */
  insertAt(value, index = Infinity) {
    if (index <= 0) this.prepend(value);
    else if (index >= this.getSize() - 1) this.append(value);
    else {
      const prevNode = this.getNodeByIndex(index - 1);
      const newNode = new Node(value, prevNode.next, prevNode);
      prevNode.next = newNode;
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

    if (this.head === this.tail) this.clear();
    else {
      this.head = deletedNode.next;
      this.head.prev = null;
      deletedNode.next = null;
    }

    return deletedNode;
  }

  // ! Method to delete last node of the LL
  /**
   * @returns {Node}
   */
  deleteTail() {
    if (!this.head) return null;

    let deletedNode = this.tail;

    if (this.head == this.tail) this.clear();
    else {
      this.tail = deletedNode.prev;
      this.tail.next = null;
      deletedNode.prev = null;
    }

    return deletedNode;
  }

  // ! Method to delete a node with given index
  /**
   * @param {number} index
   * @returns {Node}
   */
  deleteNodeByIndex(index) {
    const listSize = this.getSize();

    if (index < 0 || index > listSize - 1) return null;
    else if (index === 0) return this.deleteHead();
    else if (index === listSize - 1) return this.deleteTail();
    else {
      const deletedNode = this.getNodeByIndex(index);
      deletedNode.prev.next = deletedNode.next;
      deletedNode.next.prev = deletedNode.prev;

      deletedNode.next = null;
      deletedNode.prev = null;
      return deletedNode;
    }
  }

  // ! Method to delete a node by value
  /**
   * @param {*} value
   * @returns {Node}
   */
  deleteNodeByValue(value) {
    if (value === this.head.value) return this.deleteHead();
    else if (value === this.tail.value) return this.deleteTail();
    else {
      const node = this.getNodeByValue(value);
      if (!node) return null;
      else {
        node.prev.next = node.next;
        node.next.prev = node.prev;

        node.next = null;
        node.prev = null;

        return node;
      }
    }
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
    arr.forEach((ele) => this.append(ele));

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

  //! To loop over the list
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

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      // storing value of next node and prev node w.r.t current node
      nextNode = currentNode.next;
      prevNode = currentNode.prev;

      // Swappng next to prev
      currentNode.next = prevNode;
      currentNode.prev = nextNode;

      // move each node one step forwared
      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  // ! Method to delete all the nodes.
  clear() {
    this.head = null;
    this.tail = null;
  }

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

const list = new DoublyLinkList();

list.insertAt(10);
list.insertAt(20);
list.insertAt(30);
list.print();
list.reverse();
list.print();
