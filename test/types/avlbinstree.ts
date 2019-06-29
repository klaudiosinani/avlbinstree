import { Tree, Node } from '../..';

const tree = new Tree<string>();
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
