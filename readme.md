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
