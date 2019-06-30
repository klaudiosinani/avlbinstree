'use strict';
const test = require('ava');
const {Node, Tree} = require('../.');

const tree = new Tree();

test('insert', t => {
  tree
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C');

  t.true(tree._isBalanced());

  t.is(tree.root.key, 10);
  t.is(tree.root.value, 'A');
  t.is(tree.root.left.key, 5);
  t.is(tree.root.left.value, 'B');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 15);
  t.is(tree.root.right.value, 'C');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('insert duplicate', t => {
  tree.clear()
    .insert(10, 'A');

  t.true(tree._isBalanced());

  t.deepEqual(tree.insert(10, 'A'), tree);

  t.true(tree._isBalanced());
});

test('insert LL case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(3, 'B')
    .insert(2, 'C');

  t.true(tree._isBalanced());

  t.is(tree.root.key, 3);
  t.is(tree.root.value, 'B');
  t.is(tree.root.left.key, 2);
  t.is(tree.root.left.value, 'C');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 5);
  t.is(tree.root.right.value, 'A');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('insert LR case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(3, 'B')
    .insert(4, 'C');

  t.true(tree._isBalanced());

  t.is(tree.root.key, 4);
  t.is(tree.root.value, 'C');
  t.is(tree.root.left.key, 3);
  t.is(tree.root.left.value, 'B');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 5);
  t.is(tree.root.right.value, 'A');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('insert RR case', t => {
  tree.clear()
    .insert(3, 'A')
    .insert(5, 'B')
    .insert(7, 'C');

  t.true(tree._isBalanced());

  t.is(tree.root.key, 5);
  t.is(tree.root.value, 'B');
  t.is(tree.root.left.key, 3);
  t.is(tree.root.left.value, 'A');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 7);
  t.is(tree.root.right.value, 'C');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('insert RL case', t => {
  tree.clear()
    .insert(3, 'A')
    .insert(5, 'B')
    .insert(4, 'C');

  t.true(tree._isBalanced());

  t.is(tree.root.key, 4);
  t.is(tree.root.value, 'C');
  t.is(tree.root.left.key, 3);
  t.is(tree.root.left.value, 'A');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 5);
  t.is(tree.root.right.value, 'B');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('root', t => {
  const node = new Node(10, 'A');
  node.left = new Node(5, 'B');
  node.right = new Node(15, 'C');
  node._height = node.maxChildHeight() + 1;

  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C');

  t.deepEqual(tree.root, node);
});

test('clear', t => {
  t.deepEqual(tree.clear(), new Tree());
  t.is(tree.root, null);
});

test('fullNodes', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.deepEqual(tree.fullNodes().map(x => x.toPair()), [[5, 'B'], [10, 'A']]);
});

test('height', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.is(tree.height(), 2);
});

test('includes', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.true(tree.includes(7));
  t.true(tree.includes(3));
  t.false(tree.includes(50));
});

test('inOrder', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  const array = [];
  t.deepEqual(tree.inOrder(x => array.push(x.toPair())), tree);
  t.deepEqual(array, [[3, 'D'], [5, 'B'], [7, 'E'], [10, 'A'], [15, 'C']]);
});

test('internalNodes', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.deepEqual(tree.internalNodes().map(x => x.toPair()), [[5, 'B'], [10, 'A']]);
});

test('isComplete', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.true(tree.isComplete());
  tree.insert(30, 'F');
  t.false(tree.isComplete());
  tree
    .remove(30)
    .remove(15);
  t.false(tree.isComplete());
});

test('isEmpty', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.false(tree.isEmpty());
  tree.clear();
  t.true(tree.isEmpty());
});

test('isFull', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.true(tree.isFull());
  tree.insert(12, 'F');
  t.false(tree.isFull());
});

test('isPerfect', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E');

  t.false(tree.isPerfect());
  tree
    .insert(12, 'G')
    .insert(17, 'H');
  t.true(tree.isPerfect());
  tree.remove(7);
  t.false(tree.isPerfect());
});

test('keys', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.deepEqual(tree.keys(), [3, 5, 7, 10, 12, 15, 17]);
});

test('leafNodes', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.deepEqual(tree.leafNodes().map(x => x.toPair()), [[3, 'D'], [7, 'E'], [12, 'F'], [17, 'G']]);
});

test('levelOrder', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const array = [];
  t.deepEqual(tree.levelOrder(x => array.push(x.toPair())), tree);
  t.deepEqual(array, [[10, 'A'], [5, 'B'], [15, 'C'], [3, 'D'], [7, 'E'], [12, 'F'], [17, 'G']]);
});

test('max', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(17, 'G');
  t.deepEqual(tree.max(), node);
  t.deepEqual(tree.max(), tree.root.right.right);
});

test('maxKey', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(17, 'G');
  t.is(tree.maxKey(), node.key);
  t.is(tree.maxKey(), tree.root.right.right.key);
});

test('maxValue', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(17, 'G');
  t.is(tree.maxValue(), node.value);
  t.is(tree.maxValue(), tree.root.right.right.value);
});

test('min', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(3, 'D');
  t.deepEqual(tree.min(), node);
  t.deepEqual(tree.min(), tree.root.left.left);
});

test('minKey', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(3, 'D');
  t.is(tree.minKey(), node.key);
  t.is(tree.minKey(), tree.root.left.left.key);
});

test('minValue', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = new Node(3, 'D');
  t.is(tree.minValue(), node.value);
  t.is(tree.minValue(), tree.root.left.left.value);
});

test('outOrder', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const array = [];
  t.deepEqual(tree.outOrder(x => array.push(x.toPair())), tree);
  t.deepEqual(array, [[17, 'G'], [15, 'C'], [12, 'F'], [10, 'A'], [7, 'E'], [5, 'B'], [3, 'D']]);
});

test('postOrder', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const array = [];
  t.deepEqual(tree.postOrder(x => array.push(x.toPair())), tree);
  t.deepEqual(array, [[3, 'D'], [7, 'E'], [5, 'B'], [12, 'F'], [17, 'G'], [15, 'C'], [10, 'A']]);
});

test('preOrder', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const array = [];
  t.deepEqual(tree.preOrder(x => array.push(x.toPair())), tree);
  t.deepEqual(array, [[10, 'A'], [5, 'B'], [3, 'D'], [7, 'E'], [15, 'C'], [12, 'F'], [17, 'G']]);
});

test('remove', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C');

  tree.remove(10);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 15);
  t.is(tree.root.value, 'C');

  tree.remove(15);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 5);
  t.is(tree.root.value, 'B');

  tree.insert(2, 'E');
  t.true(tree._isBalanced());

  tree.remove(5);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 2);
  t.is(tree.root.value, 'E');

  tree.insert(3, 'F');
  t.true(tree._isBalanced());

  tree.remove(2);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 3);
  t.is(tree.root.value, 'F');

  tree.remove(3);
  t.true(tree._isBalanced());

  t.is(tree.root, null);
});

test('remove LL case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(7, 'E')
    .insert(3, 'B')
    .insert(4, 'C')
    .insert(2, 'D');

  tree.remove(7);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 3);
  t.is(tree.root.value, 'B');
  t.is(tree.root.left.key, 2);
  t.is(tree.root.left.value, 'D');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 5);
  t.is(tree.root.right.value, 'A');
  t.is(tree.root.right.left.key, 4);
  t.is(tree.root.right.left.value, 'C');
  t.is(tree.root.right.right, null);
});

test('remove LR case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(7, 'E')
    .insert(3, 'B')
    .insert(4, 'C');

  tree.remove(7);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 4);
  t.is(tree.root.value, 'C');
  t.is(tree.root.left.key, 3);
  t.is(tree.root.left.value, 'B');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 5);
  t.is(tree.root.right.value, 'A');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('remove RR case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(3, 'B')
    .insert(7, 'C')
    .insert(6, 'D')
    .insert(8, 'E');

  tree.remove(3);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 7);
  t.is(tree.root.value, 'C');
  t.is(tree.root.left.key, 5);
  t.is(tree.root.left.value, 'A');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right.key, 6);
  t.is(tree.root.left.right.value, 'D');
  t.is(tree.root.right.key, 8);
  t.is(tree.root.right.value, 'E');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('remove RL case', t => {
  tree.clear()
    .insert(5, 'A')
    .insert(3, 'B')
    .insert(7, 'C')
    .insert(6, 'D');

  tree.remove(3);
  t.true(tree._isBalanced());

  t.is(tree.root.key, 6);
  t.is(tree.root.value, 'D');
  t.is(tree.root.left.key, 5);
  t.is(tree.root.left.value, 'A');
  t.is(tree.root.left.left, null);
  t.is(tree.root.left.right, null);
  t.is(tree.root.right.key, 7);
  t.is(tree.root.right.value, 'C');
  t.is(tree.root.right.left, null);
  t.is(tree.root.right.right, null);
});

test('search', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  const node = tree.search(12);
  t.is(node.key, 12);
  t.is(node.value, 'F');
  t.is(node.left, null);
  t.is(node.right, null);
});

test('size', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.is(tree.size(), 7);
});

test('toArray', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.deepEqual(tree.toArray().map(x => x.toPair()), [[3, 'D'], [5, 'B'], [7, 'E'], [10, 'A'], [12, 'F'], [15, 'C'], [17, 'G']]);
});

test('toPairs', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.deepEqual(tree.toPairs(), [[3, 'D'], [5, 'B'], [7, 'E'], [10, 'A'], [12, 'F'], [15, 'C'], [17, 'G']]);
});

test('values', t => {
  tree.clear()
    .insert(10, 'A')
    .insert(5, 'B')
    .insert(15, 'C')
    .insert(3, 'D')
    .insert(7, 'E')
    .insert(12, 'F')
    .insert(17, 'G');

  t.deepEqual(tree.values(), ['D', 'B', 'E', 'A', 'F', 'C', 'G']);
});
