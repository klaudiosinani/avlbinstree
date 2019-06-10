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

  isEmpty() {
    return !this.root;
  }
}

module.exports = Tree;
