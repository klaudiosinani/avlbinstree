<h1 align="center">
  Avlbinstree
</h1>

<h4 align="center">
  AVL self-balancing binary search trees for ES6
</h4>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/avlbinstree">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/avlbinstree.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/klaussinani/avlbinstree?branch=master'>
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/klaussinani/avlbinstree/badge.svg?branch=master">
  </a>
</p>

## Description

ES6 implementation of the AVL self-balancing binary search tree data structure with TypeScript support.

Come over to [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

Visit the [contributing guidelines](https://github.com/klaussinani/avlbinstree/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [In Depth](#in-depth)
- [Usage](#usage)
- [API](#api)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

### Yarn

```bash
yarn add avlbinstree
```

### NPM

```bash
npm install avlbinstree
```

## In Depth

An AVL tree is a self-balancing binary search tree data structure, whose nodes contain a unique `key`, an associated `value`, and point to two distinguished `left` and `right` sub-trees. In the tree, the heights of the two child sub-trees of any node differ by at most one. If during a mutating operation, e.g insertion, deletion, a temporary height difference of more than one arises between two child sub-trees, the balance property of the parent sub-tree, thus of the entire tree itself, is restored through the internal usage of tree rotations. These repair tools move the tree nodes only `vertically`, so that the `horizontal/in-order` sequence of their keys is fully preserved. Lookup, insertion, and deletion all take `O(log n)` time in both the average and worst cases, where `n` is the number of nodes in the tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.

## Usage

Avlbinstree exposes a chainable API, that can be utilized through a simple and minimal syntax, allowing you to combine methods effectively.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/avlbinstree/tree/master/test) directory.

```js
'use strict';
const {Tree, Node} = require('avlbinstree');

const tree = new Tree();
//=> Tree { root: null }

tree.insert(9, 'A');
// => Tree { root: Node { left: null, right: null, key: 9, value: 'A' } }

tree.root;
//=> Node { left: null, right: null, key: 10, value: 'A' }

const node = new Node(9, 'A');

tree.root.key === node.key;
//=> true

tree.root.value === node.value;
//=> true

tree.insert(5, 'B').insert(13, 'C').root;
//=> Node { left: [Node], right: [Node], key: 9, value: 'A' }

tree.root.left;
//=> Node { left: null, right: null, key: 5, value: 'B' }

tree.root.right;
//=> Node { left: null, right: null, key: 13, value: 'C' }

tree.insert(11, 'D').insert(15, 'E');
/*=>    {9}
 *     /  \
 *   {5}  {13}
 *        /  \
 *     {11}  {15}
 */

tree.size();
//=> 5

tree.search(13);
//=> Node { key: 13, value: 'C',
//  left: Node { left: null, right: null, key: 11, value: 'D' },
//  right: Node { left: null, right: null, key: 15, value: 'E' } }

tree.search(25);
//=> null

tree.includes(11);
//=> true

tree.includes(100);
//=> false

tree.height();
//=> 2

tree.remove(5);
/*=>   {13}
 *     /  \
 *  {9}  {15}
 *    \
 *   {11}
 */

tree.root.isRightHeavy();
//=> false

tree.root.isLeftHeavy();
//=> true

tree.max();
//=> Node { left: null, right: null, key: 15, value: 'E' }

tree.maxKey();
//=> 15

tree.maxValue();
//=> 'E'

tree.min();
//=> Node { left: null, right: null, key: 9, value: 'A' }
  
tree.minKey();
//=> 9

tree.minValue();
//=> 'A'

tree.remove(15);
/*=>   {11}
 *     /  \
 *   {9}  {13}
 */

tree.root.isBalanced();
//=> true

tree.keys();
//=> [9, 11, 13]

tree.values();
//=> ['A', 'D', 'C']
```

## API

#### tree.`root`

- Return Type: `Node | null`

Returns the root node of the tree.
If the tree is empty `null` is returned.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A');
// => Tree { root: Node { key: 10, value: 'A', left: null, right: null } }
tree.root;
// => Node { key: 10, value: 'A', left: null, right: null }
```

#### tree.`clear()`

- Return Type: `Tree`

Mutates the tree by removing all residing nodes and returns it empty.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
//=> Tree { root: Node { left: [Node], right: [Node], key: 3, value: 'A' } }
tree.size();
//=> 3
tree.clear();
//=> Tree { root: null } }
tree.size();
//=> 0
```

#### tree.`fullNodes()`

- Return Type: `Array<Node>`

Applies in-order traversal to the tree and stores each traversed full node (node with two non-null children) in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.fullNodes();
//=> [ 
//  Node { left: [Node], right: [Node], key: 10, value: 'A' } 
// ]
```

#### tree.`height()`

- Return Type: `Number`

Returns the maximum distance of any leaf node from the root. 
If the tree is empty `-1` is returned.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A');
tree.height();
// => 0
tree.insert(5, 'B').insert(15, 'C').insert(25, 'D');
tree.height();
//=> 3
```

#### tree.`includes(key)`

- Return Type: `Boolean`

Determines whether the tree includes a node with a certain `key`, returning `true` or `false` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B');
tree.includes(10);
// => true
tree.includes(25);
// => false
tree.includes(5);
// => true
```

#### tree.`inOrder(fn)`

- Return Type: `Tree`

Applies in-order traversal (depth-first traversal - LNR) to the tree and executes the provided `fn` function on each traversed node without mutating the tree itself.

##### **`fn`**

- Type: `Function`

Function to execute on each node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.inOrder(node => console.log(node.key));
// => 5
// 10
// 15
```

#### tree.`insert(key, value)`

- Return Type: `Tree`

Mutates the tree by inserting a new node at the appropriate location.

##### **`key`**

- Type: `Number`

Can be any number that will correspond to the `key` of the created node. 
Each node has its own unique `key`.

##### **`value`**

- Type: `Any`

Can be any value that will stored in the created node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A');
// => Tree { root: Node { key: 10, value: 'A', left: null, right: null } }
```

#### tree.`internalNodes()`

- Return Type: `Array<Node>`

Applies in-order traversal to the tree and stores each traversed internal node (node with at least a single non-null child) in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C').insert(20, 'D');
tree.internalNodes();
//=> [ 
//  Node { left: [Node], right: [Node], key: 10, value: 'A' },
//  Node { left: null, right: [Node], key: 15, value: 'C' } 
// ]
```

#### tree.`isComplete()`

- Return Type: `Boolean`

The method returns `true` if the tree is a complete binary search tree, which implies that every level, except possibly the last, is completely filled, and all nodes are as far left as possible.
In any other case, the method returns `false`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.isComplete();
//=> true
tree.insert(3, 'D');
tree.isComplete();
//=> true
tree.insert(20, 'E');
tree.isComplete();
//=> false
```

#### tree.`isEmpty()`

- Return Type: `Boolean`

Determines whether the tree is empty, returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A');
tree.isEmpty();
// => false
```

#### tree.`isFull()`

- Return Type: `Boolean`

The method returns `true` if all the nodes residing in the tree are either leaf nodes or full nodes.
In any other case (node degree equal to 1) the method returns `false`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.isFull();
//=> true
tree.insert(8, 'D');
tree.isFull();
//=> false
```

#### tree.`isPerfect()`

- Return Type: `Boolean`

The method returns `true` if all the internal nodes residing in the tree are full nodes (node degree equal to 2) and all leaf nodes are at the same height level. In any other case (node degree equal to 1 or leaf and full nodes are found on the same height level) the method returns `false`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.isPerfect();
//=> true
tree.insert(3, 'D').insert(7, 'E').insert(12, 'F').insert(20, 'G');
tree.isPerfect();
//=> true
tree.insert(1, 'H');
tree.isPerfect();
//=> false
```

#### tree.`keys()`

- Return Type: `Array<Number>`

Applies in-order traversal to the tree and stores the `key` of each traversed node in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.keys();
//=> [ 5, 10, 15 ]
```

#### tree.`leafNodes()`

- Return Type: `Array<Node>`

Applies in-order traversal to the tree and stores each traversed leaf node (node without children) in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.leafNodes();
//=> [ 
//  Node { left: null, right: null, key: 5, value: 'B' },
//  Node { left: null, right: null, key: 15, value: 'C' } 
// ]
```

#### tree.`levelOrder(fn)`

- Return Type: `Tree`

Applies level-order traversal (breadth-first traversal) to the tree and executes the provided `fn` function on each traversed node without mutating the tree itself.

##### **`fn`**

- Type: `Function`

Function to execute on each node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.levelOrder(node => console.log(node.key));
// => 10
// 5
// 15
```

#### tree.`max()`

- Return Type: `Node | null`

Returns the right-most node in the tree, thus the node corresponding to the maximum `key`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.max();
// => Node { key: 25, value: 'C', left: null, right: null }
```

#### tree.`maxKey()`

- Return Type: `Number | null`

Returns the `key` of right-most node in the tree, thus the maximum `key` in the tree.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.maxKey();
// => 25
```

#### tree.`maxValue()`

- Return Type: `Any | null`

Returns the `value` of right-most node in the tree, thus the `value` of the node corresponding to the maximum `key`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.maxValue();
// => 'C'
```

#### tree.`min()`

- Return Type: `Node | null`

Returns the left-most node in the tree, thus the node corresponding to the minimum `key`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(0, 'C');
tree.min();
// => Node { key: 0, value: 'C', left: null, right: null }
```

#### tree.`minKey()`

- Return Type: `Number | null`

Returns the `key` of the left-most node in the tree, thus the minimum `key` in the tree.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.minKey();
// => 10
```

#### tree.`minValue()`

- Return Type: `Any | null`

Returns the `value` of the left-most node in the tree, thus the `value` of the node corresponding to the minimum `key`.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.maxValue();
// => 'A'
```

#### tree.`outOrder(fn)`

- Return Type: `Tree`

Applies out-order traversal (depth-first traversal - RNL) to the tree and executes the provided `fn` function on each traversed node without mutating the tree itself.

##### **`fn`**

- Type: `Function`

Function to execute on each node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.outOrder(node => console.log(node.key));
// => 15
// 10
// 5
```

#### tree.`postOrder(fn)`

- Return Type: `Tree`

Applies post-order traversal (depth-first traversal - LRN) to the tree and executes the provided `fn` function on each traversed node without mutating the tree itself.

##### **`fn`**

- Type: `Function`

Function to execute on each node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.postOrder(node => console.log(node.key));
// => 5
// 15
// 10
```

#### tree.`preOrder(fn)`

- Return Type: `Tree`

Applies pre-order traversal (depth-first traversal - NLR) to the tree and executes the provided `fn` function on each traversed node without mutating the tree itself.

##### **`fn`**

- Type: `Function`

Function to execute on each node.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.preOrder(node => console.log(node.key));
// => 10
// 5
// 15
```

#### tree.`remove(key)`

- Return Type: `Tree`

Mutates the tree by removing the node corresponding to the `key` argument.

##### **`key`**

- Type: `Number`

Can be any number that corresponds to the `key` of an existing node. 

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A');
tree.remove(10);
//=> Tree { root: null }
```

#### tree.`search(key)`

- Return Type: `Node | null`

Determines whether the tree includes a node with a certain `key`, returning the targeted node or `null` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B');
tree.search(10);
// => Node { key: 10, value: 'A', left: [Node], right: null }
tree.search(25);
// => null
tree.search(5);
// => Node { key: 5, value: 'B', left: null, right: null }
```

#### tree.`size()`

- Return Type: `Number`

Returns the total number of nodes residing in the tree.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(15, 'B').insert(25, 'C');
tree.size();
// => 3
```

#### tree.`toArray()`

- Return Type: `Array<Node>`

Applies in-order traversal to the tree and stores each traversed node in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C').insert(3, 'D').insert(20, 'F');
tree.toArray();
//=> [
//  Node { left: null, right: null, key: 3, value: 'D' },
//  Node { left: [Node], right: null, key: 5, value: 'B' },
//  Node { left: [Node], right: [Node], key: 10, value: 'A' },
//  Node { left: null, right: [Node], key: 15, value: 'C' },
//  Node { left: null, right: null, key: 20, value: 'F' }
// ]
```

#### tree.`toPairs()`

- Return Type: `Array<[Number, Any]>`

Applies in-order traversal to the tree and for each traversed node stores in an array of size `n`, where `n` the size of the tree, an ordered-pair/2-tuple, where the first element is a `number` corresponding to the `key` of the traversed node, and the last one is a value of type `any`, corresponding to the `value` stored in the traversed node.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C').insert(3, 'D').insert(20, 'F');
tree.toPairs();
//=> [ [3, 'D'], [5, 'B'], [10, 'A'], [15, 'C'], [20, 'F'] ]
```

#### tree.`values()`

- Return Type: `Array<Any>`

Applies in-order traversal to the tree and stores the `value` of each traversed node in an array.
The array is returned at the end of the traversal.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(15, 'C');
tree.keys();
//=> [ 'B', 'A', 'C' ]
```

Also available, along with the `Tree` exposed class, is the `Node` class, mainly useful for testing purposes, since it can be utilized to compare tree nodes. The class has a binary constructor method, with a `key` and a `value` parameter, corresponding to the key and the value stored in the created instance, respectively.

#### node.`key`

- Return Type: `Number`

The `key` corresponding to the node instance.

```js
const {Node} = require('avlbinstree');

const node = new Node(10, 'A');
// => { key:10, value: 'A', left: null, right: null }
node.key;
//=> 10
```

#### node.`value`

- Return Type: `Any`

The value that the node contains.

```js
const {Node} = require('avlbinstree');

const node = new Node(10, 'A');
// => { key: 10, value: 'A', left: null, right: null }
node.value;
//=> 'A'
node.value = 'B'
// => { key: 10, value: 'B', left: null, right: null }
```

#### node.`left`

- Return Type: `Node | null`

The left sub-tree that the node points to.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root;
// => { key: 10, value: 'A', left: null, right: null }
tree.root.left;
//=> null
tree.insert(5, 'B').root;
// => { key: 10, value: 'A', left: { key: 5, value: 'B', left: null, right: null } , right: null }
tree.root.left;
//=> { key: 5, value: 'B', left: null, right: null }
```

#### node.`right`

- Return Type: `Node | null`

The right sub-tree that the node points to.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root;
// => { key: 10, value: 'A', left: null, right: null }
tree.root.right;
//=> null
tree.insert(15, 'B').root;
// => { key: 10, value: 'A', left: null , right: { key: 15, value: 'B', left: null, right: null } }
tree.root.right;
//=> { key: 15, value: 'B', left: null, right: null }
```

#### node.`balanceFactor`

- Return Type: `Number`

Returns a number corresponding to the balance factor of a node, which is defined as the height difference of its two child sub-trees.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.balanceFactor;
//=> 0
tree.insert(5, 'B').root.balanceFactor;
//=> 1
tree.remove(5).insert(15, 'C').root.balanceFactor;
//=> -1
```

#### node.`children`

- Return Type: `Array<Node>`

Returns an array contacting the children of the instance, where the left child, if present, is the first element of the array, and the right child, if present, is the last element of the array.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.children;
//=> []
tree.insert(5, 'B').insert(15, 'C').root.children;
// => [
//  { key: 5, value: 'B', left: null , right: null }, 
//  { key: 15, value: 'C', left: null, right: null }
// ]
```

#### node.`degree`

- Return Type: `Number`

Returns the number of sub-trees that the node points to.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.degree;
//=> 0
tree.insert(5, 'B').root.degree;
//=> 1
tree.insert(15, 'C').root.degree;
//=> 2
```

#### node.`height`

- Return Type: `Number`

Returns the maximum distance of any leaf node from the node instance.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').insert(5, 'B').insert(10, 'C').insert(25, 'D');
tree.root.height;
//=> 2
tree.root.right.height();
//=> 1
```

#### node.`isBalanced()`

- Return Type: `Boolean`

Determines whether a node is a balanced (has a balance factor equal to 0), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isBalanced();
//=> true
tree.insert(5, 'B').root.isBalanced();
//=> false
```

#### node.`isFull()`

- Return Type: `Boolean`

Determines whether a node is a full node (has two non-null children), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isFull();
//=> false
tree.insert(5, 'B').insert(15, 'C').root.isFull();
//=> true
```

#### node.`isInternal()`

- Return Type: `Boolean`

Determines whether a node is an internal node (has at least one non-null child), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isInternal();
//=> false
tree.insert(5, 'B').root.isInternal();
//=> true
```

#### node.`isLeaf()`

- Return Type: `Boolean`

Determines whether a node is a leaf node (has no children), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isLeaf();
//=> true
tree.insert(5, 'B').root.isLeaf();
//=> false
```

#### node.`isLeftHeavy()`

- Return Type: `Boolean`

Determines whether a node is left heavy (has a balance factor greater than zero), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isLeftHeavy();
//=> false
tree.insert(5, 'B').root.isLeftPartial();
//=> true
tree.remove(5).insert(10, 'C').root.isLeftPartial();
//=> false
```

#### node.`isLeftPartial()`

- Return Type: `Boolean`

Determines whether a node is a left partial node (has ony one left non-null child), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isLeftPartial();
//=> false
tree.insert(5, 'B').root.isLeftPartial();
//=> true
```

#### node.`isPartial()`

- Return Type: `Boolean`

Determines whether a node is a partial node (has ony one non-null child), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isPartial();
//=> false
tree.insert(15, 'B').root.isPartial();
//=> true
```

#### node.`isRightHeavy()`

- Return Type: `Boolean`

Determines whether a node is right heavy (has a balance factor less than zero), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isRightHeavy();
//=> false
tree.insert(15, 'C').root.isRightHeavy();
//=> true
tree.remove(15).insert(5, 'B').root.isRightHeavy();
//=> false
```

#### node.`isRightPartial()`

- Return Type: `Boolean`

Determines whether a node is a right partial node (has ony one right non-null child), returning `true` or `false` as appropriate.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.isRightPartial();
//=> false
tree.insert(15, 'B').root.isRightPartial();
//=> true
```

#### node.`leftChildHeight()`

- Return Type: `Number`

Returns the maximum distance of any leaf node from the left child of the parent node instance. If the parent node has no left child, then `-1` is returned.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.leftChildHeight();
//=> -1
tree.insert(5, 'B').root.leftChildHeight();
//=> 0
```

#### node.`maxChildHeight()`

- Return Type: `Number`

Returns the maximum between the heights of the two child nodes of parent instance. If the parent node has no children, then `-1` is returned.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.maxChildHeight();
//=> -1
tree.insert(15, 'B').root.maxChildHeight();
//=> 0
tree.insert(5, 'C').root.maxChildHeight();
//=> 0
tree.insert(1, 'D').root.maxChildHeight();
//=> 1
```

#### node.`rightChildHeight()`

- Return Type: `Number`

Returns the maximum distance of any leaf node from the right child of the parent node instance. If the parent node has no right child, then `-1` is returned.

```js
const {Tree} = require('avlbinstree');

const tree = new Tree();

tree.insert(10, 'A').root.rightChildHeight();
//=> -1
tree.insert(15, 'B').root.rightChildHeight();
//=> 0
```

#### node.`toPair()`

- Return Type: `[Number, Any]`

Returns an ordered-pair/2-tuple, where the first element is a number corresponding to the `key` of the node, and the last one is a value, that can be of any type, corresponding to the `value` stored in the node.

```js
const {Node, Tree} = require('avlbinstree');

const tree = new Tree();
const node = new Node(5, 'B');

node.toPair();
//=> [5, 'B']
tree.insert(10, 'A').root.toPair();
//=> [10, 'A']
```

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/avlbinstree/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd avlbinstree`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [binstree](https://github.com/klaussinani/binstree) - Binary search trees for ES6
- [doublie](https://github.com/klaussinani/doublie) - Doubly circular & linear linked lists for ES6
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/avlbinstree/blob/master/license.md)
