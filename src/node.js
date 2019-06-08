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
}

module.exports = Node;
