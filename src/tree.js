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
    const node = this.max();

    if (node) {
      return node.key;
    }

    return null;
  }

  maxValue() {
    const node = this.max();

    if (node) {
      return node.value;
    }

    return null;
  }

  min() {
    return this._min(this.root);
  }

  minKey() {
    const node = this.min();

    if (node) {
      return node.key;
    }

    return null;
  }

  minValue() {
    const node = this.min();

    if (node) {
      return node.value;
    }

    return null;
  }
}

module.exports = Tree;
