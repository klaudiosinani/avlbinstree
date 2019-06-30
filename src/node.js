'use strict';

class Node {
  constructor(key, value) {
    this._height = 0;
    this._left = null;
    this._right = null;
    this._key = key;
    this._value = value;
  }

  _rotateLeft() {
    const {right} = this;
    this.right = right.left;
    right.left = this;

    this._height = this.maxChildHeight() + 1;
    right._height = right.maxChildHeight() + 1;

    return right;
  }

  _rotateRight() {
    const {left} = this;
    this.left = left.right;
    left.right = this;

    this._height = this.maxChildHeight() + 1;
    left._height = left.maxChildHeight() + 1;

    return left;
  }

  get balanceFactor() {
    return this.leftChildHeight() - this.rightChildHeight();
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

  isBalanced() {
    return this.balanceFactor === 0;
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

  isLeftHeavy() {
    return this.balanceFactor > 0;
  }

  isLeftPartial() {
    return this.left !== null && !this.right;
  }

  isPartial() {
    return this.isLeftPartial() || this.isRightPartial();
  }

  isRightHeavy() {
    return this.balanceFactor < 0;
  }

  isRightPartial() {
    return !this.left && this.right !== null;
  }

  leftChildHeight() {
    if (this.left) {
      return this.left.height;
    }

    return -1;
  }

  maxChildHeight() {
    return Math.max(this.leftChildHeight(), this.rightChildHeight());
  }

  rightChildHeight() {
    if (this.right) {
      return this.right.height;
    }

    return -1;
  }

  toPair() {
    return [this.key, this.value];
  }
}

module.exports = Node;
