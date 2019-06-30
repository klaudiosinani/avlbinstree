'use strict';
const test = require('ava');
const {Node} = require('../.');

test('key', t => {
  const node = new Node(10, 'A');
  t.is(node.key, 10);
});

test('value', t => {
  const node = new Node(10, 'A');
  t.is(node.value, 'A');
  node.value = 'B';
  t.is(node.value, 'B');
});

test('left', t => {
  const node = new Node(10, 'A');
  t.is(node.left, null);
  t.throws(() => {
    node.left = new Node(15, 'B');
  }, 'Left child node key must be less than the parent node key');
  node.left = new Node(5, 'B');
  t.deepEqual(node.left, new Node(5, 'B'));
  t.is(node.left.key, 5);
  t.is(node.left.value, 'B');
  t.is(node.left.left, null);
  t.is(node.left.right, null);
});

test('right', t => {
  const node = new Node(10, 'A');
  t.is(node.right, null);
  t.throws(() => {
    node.right = new Node(5, 'B');
  }, 'Right child node key must be greater than the parent node key');
  node.right = new Node(15, 'B');
  t.deepEqual(node.right, new Node(15, 'B'));
  t.is(node.right.key, 15);
  t.is(node.right.value, 'B');
  t.is(node.right.left, null);
  t.is(node.right.right, null);
});

test('children', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.deepEqual(node.children, []);
  node.left = left;
  t.deepEqual(node.children, [left]);
  node.right = right;
  t.deepEqual(node.children, [left, right]);
});

test('balanceFactor', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.is(node.balanceFactor, 0);
  node.left = left;
  t.is(node.balanceFactor, 1);
  node.left = null;
  node.right = right;
  t.is(node.balanceFactor, -1);
});

test('height', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.is(node.height, 0);
  node.left = left;
  node.right = right;
  t.is(node.height, 0);
});

test('degree', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.is(node.degree, 0);
  node.left = left;
  t.is(node.degree, 1);
  node.right = right;
  t.is(node.degree, 2);
});

test('isBalanced', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.true(node.isBalanced());
  node.left = left;
  t.false(node.isBalanced());
  node.right = right;
  t.true(node.isBalanced());
});

test('isFull', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isFull());
  node.left = left;
  t.false(node.isFull());
  node.right = right;
  t.true(node.isFull());
});

test('isInternal', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isInternal());
  node.left = left;
  t.true(node.isInternal());
  node.right = right;
  t.true(node.isInternal());
});

test('isLeaf', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.true(node.isLeaf());
  node.left = left;
  t.false(node.isLeaf());
  node.right = right;
  t.false(node.isLeaf());
});

test('isLeftHeavy', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isLeftHeavy());
  node.left = left;
  t.true(node.isLeftHeavy());
  node.left = null;
  node.right = right;
  t.false(node.isLeftHeavy());
});

test('isLeftPartial', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isLeftPartial());
  node.left = left;
  t.true(node.isLeftPartial());
  node.right = right;
  t.false(node.isLeftPartial());
});

test('isPartial', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isPartial());
  node.left = left;
  t.true(node.isPartial());
  node.right = right;
  t.false(node.isPartial());
});

test('isRightHeavy', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isRightHeavy());
  node.left = left;
  t.false(node.isRightHeavy());
  node.left = null;
  node.right = right;
  t.true(node.isRightHeavy());
});

test('isRightPartial', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  const right = new Node(15, 'C');
  t.false(node.isRightPartial());
  node.right = right;
  t.true(node.isRightPartial());
  node.left = left;
  t.false(node.isRightPartial());
});

test('leftChildHeight', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  t.is(node.leftChildHeight(), -1);
  node.left = left;
  t.is(node.leftChildHeight(), 0);
});

test('maxChildHeight', t => {
  const node = new Node(10, 'A');
  const left = new Node(5, 'B');
  t.is(node.maxChildHeight(), -1);
  node.left = left;
  t.is(node.maxChildHeight(), 0);
});

test('rightChildHeight', t => {
  const node = new Node(10, 'A');
  const right = new Node(15, 'C');
  t.is(node.rightChildHeight(), -1);
  node.right = right;
  t.is(node.rightChildHeight(), 0);
});

test('toPair', t => {
  const node = new Node(10, 'A');
  t.deepEqual(node.toPair(), [10, 'A']);
});
