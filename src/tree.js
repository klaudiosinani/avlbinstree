'use strict';

class Tree {
  constructor() {
    this._root = null;
  }

  get root() {
    return this._root;
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
}

module.exports = Tree;
