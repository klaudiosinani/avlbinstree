'use strict';

class Node {
  constructor(key, value) {
    this._height = null;
    this._left = null;
    this._right = null;
    this._key = key;
    this._value = value;
  }

  get children() {
    const children = [];

    if (this.left) {
      children.push(this.left);
    }

    if (this.right) {
      children.push(this.right);
    }

    return children;
  }

  get degree() {
    return this.children.length;
  }

  get height() {
    return this._height;
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

  set right(node) {
    if (node && node.key <= this.key) {
      throw new Error('Right child node key must be greater than the parent node key');
    }

    this._right = node;
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

  isFull() {
    return this.left !== null && this.right !== null;
  }

  isInternal() {
    return this.left !== null || this.right !== null;
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  isLeftPartial() {
    return this.left !== null && !this.right;
  }

  isPartial() {
    return this.degree === 1;
  }

  isRightPartial() {
    return !this.left && this.right !== null;
  }

  toPair() {
    return [this.key, this.value];
  }
}

module.exports = Node;
