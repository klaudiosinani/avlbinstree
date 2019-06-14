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

  isEmpty() {
    return !this.root;
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
}

module.exports = Tree;
