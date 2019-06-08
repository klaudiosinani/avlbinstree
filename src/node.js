'use strict';

class Node {
  constructor(key, value) {
    this._left = null;
    this._right = null;
    this._key = key;
    this._value = value;
  }

  get left() {
    return this._left;
  }

  set left(node) {
    if (node && node.key >= this.key) {
      throw new Error('Left child node key must be less than the parent node key');
    }

    this._left = node;
  }

  get right() {
    return this._right;
  }

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

module.exports = Node;
