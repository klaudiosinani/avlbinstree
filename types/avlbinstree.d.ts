declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    value: T;
    left: Instance<T> | null;
    right: Instance<T> | null;
    readonly balanceFactor: number;
    readonly key: number;
    readonly children: Instance<T>[];
    readonly degree: 0 | 1 | 2;
    isFull(): boolean;
    isInternal(): boolean;
    isLeaf(): boolean;
    isLeftHeavy(): boolean;
    isLeftPartial(): boolean;
    isPartial(): boolean;
    isRightHeavy(): boolean;
    isRightPartial(): boolean;
    leftChildHeight(): number;
    maxChildHeight(): number;
    rightChildHeight(): number;
    toPair(): [number, T];
  }
}

declare namespace tree {
  type UnaryCallback<T> = (x: T) => void;

  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    readonly root: Node<T> | null;
    clear(): this;
    fullNodes(): Node<T>[];
    includes(key: number): boolean;
    inOrder(fn: UnaryCallback<Node<T>>): this;
    insert(key: number, value: T): this;
    internalNodes(): Node<T>[];
    isEmpty(): boolean;
    keys(): number[];
    leafNodes(): Node<T>[];
    levelOrder(fn: UnaryCallback<Node<T>>): this;
    max(): Node<T> | null;
    maxKey(): number | null;
    maxValue(): T | null;
    min(): Node<T> | null;
    minKey(): number | null;
    minValue(): T | null;
    outOrder(fn: UnaryCallback<Node<T>>): this;
    postOrder(fn: UnaryCallback<Node<T>>): this;
    preOrder(fn: UnaryCallback<Node<T>>): this;
    search(key: number): Node<T> | null;
    size(): number;
    toArray(): Node<T>[];
    toPairs(): [number, T][];
    values(): T[];
  }
}

declare namespace avlbinstree {
  export interface Node<T = any> extends node.Instance<T> {}
  export interface Tree<T = any> extends tree.Instance<T> {}
}

declare const avlbinstree: {
  Node: node.Constructor;
  Tree: tree.Constructor;
};

export = avlbinstree;
