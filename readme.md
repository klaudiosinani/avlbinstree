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

An AVL tree is a self-balancing binary search tree data structure, whose nodes contain a unique `key`, an associated `value`, and point to two distinguished `left` and `right` sub-trees. In the tree, the heights of the two child sub-trees of any node differ by at most one. If during a mutating operation, e.g insertion, deletion, a temporary height difference of more than one arises between two child sub-trees, the balance property of the tree is restored through the internal usage of tree rotations on the parent sub-tree. Lookup, insertion, and deletion all take `O(log n)` time in both the average and worst cases, where `n` is the number of nodes in the tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations.

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
/*=>    9
 *    /  \
 *   5   13
 *      /  \
 *     11  15
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

tree.isBalanced();
//=> true

tree.remove(5);
/*=>   13
 *    /  \
 *   9   15
 *    \
 *    11
 */

tree.root.isRightHeavy();
//=> false

tree.root.isLeftHeavy();
//=> true

tree.max();
//=> Node { left: null, right: null, key: 15, value: 'E' }

tree.min();
//=> Node { left: null, right: null, key: 9, value: 'A' }

tree.remove(15);
/*=>   11
 *    /  \
 *   9   13
 */

tree.root.isBalanced();
//=> true

tree.keys();
//=> [9, 11, 13]

tree.values();
//=> ['A', 'D', 'C']
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
