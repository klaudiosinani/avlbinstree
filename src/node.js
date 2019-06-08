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
