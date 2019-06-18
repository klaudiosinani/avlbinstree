'use strict';

class Tree {
  constructor() {
    this._root = null;
  }

  get root() {
    return this._root;
  }

  _min(node) {
    let min = node;

    if (min) {
      while (min.left) {
        min = min.left;
      }
    }

    return min;
  }

  _prop(obj, p) {
    if (obj) {
      return obj[p];
    }

    return null;
  }

  clear() {
    this._root = null;
    return this;
  }

  fullNodes() {
    const nodes = [];

    this.inOrder(node => {
      if (node.isFull()) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  includes(key) {
    let {root: current} = this;

    while (current) {
      if (key === current.key) {
        return true;
      }

      current = key < current.key ? current.left : current.right;
    }

    return false;
  }

  inOrder(fn) {
    const stack = [];
    let {root: current} = this;

    while (current || stack.length > 0) {
      if (current) {
        stack.push(current);
        current = current.left;
      } else {
        current = stack.pop();
        fn(current);
        current = current.right;
      }
    }

    return this;
  }

  internalNodes() {
    const nodes = [];

    this.inOrder(node => {
      if (node.isInternal()) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  isEmpty() {
    return !this.root;
  }

  keys() {
    const keys = [];

    this.inOrder(node => {
      keys.push(node.key);
    });

    return keys;
  }

  leafNodes() {
    const nodes = [];

    this.inOrder(node => {
      if (node.isLeaf()) {
        nodes.push(node);
      }
    });

    return nodes;
  }

  levelOrder(fn) {
    let {root: current} = this;

    if (current) {
      const queue = [];
      queue.push(current);

      while (queue.length > 0) {
        current = queue.shift();
        fn(current);
        queue.push(...current.children);
      }
    }

    return this;
  }

  max() {
    let {root: max} = this;

    if (max) {
      while (max.right) {
        max = max.right;
      }
    }

    return max;
  }

  maxKey() {
    return this._prop(this.max(), 'key');
  }

  maxValue() {
    return this._prop(this.max(), 'value');
  }

  min() {
    return this._min(this.root);
  }

  minKey() {
    return this._prop(this.min(), 'key');
  }

  minValue() {
    return this._prop(this.min(), 'value');
  }

  outOrder(fn) {
    const stack = [];
    let {root: current} = this;

    while (current || stack.length > 0) {
      if (current) {
        stack.push(current);
        current = current.right;
      } else {
        current = stack.pop();
        fn(current);
        current = current.left;
      }
    }

    return this;
  }

  postOrder(fn) {
    let last = null;
    const stack = [];
    let {root: current} = this;

    while (current || stack.length > 0) {
      if (current) {
        stack.push(current);
        current = current.left;
      } else {
        const recent = stack[stack.length - 1];

        if (recent.right && recent.right !== last) {
          current = recent.right;
        } else {
          fn(recent);
          last = stack.pop();
        }
      }
    }

    return this;
  }

  preOrder(fn) {
    let {root: current} = this;

    if (current) {
      const stack = [current];

      while (stack.length > 0) {
        current = stack.pop();
        fn(current);

        if (current.right) {
          stack.push(current.right);
        }

        if (current.left) {
          stack.push(current.left);
        }
      }
    }

    return this;
  }

  search(key) {
    let {root: current} = this;

    while (current) {
      if (key === current.key) {
        return current;
      }

      current = key < current.key ? current.left : current.right;
    }

    return current;
  }

  size() {
    let size = 0;
    this.inOrder(() => size++);
    return size;
  }

  toArray() {
    const array = [];
    this.inOrder(node => array.push(node));
    return array;
  }

  toPairs() {
    const array = [];
    this.inOrder(node => array.push(node.toPair()));
    return array;
  }

  values() {
    const values = [];
    this.inOrder(node => values.push(node.value));
    return values;
  }
}

module.exports = Tree;
