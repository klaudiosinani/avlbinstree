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
    includes(key: number): boolean;
    inOrder(fn: UnaryCallback<Node<T>>): this;
    isEmpty(): boolean;
    max(): Node<T> | null;
    maxKey(): number | null;
    maxValue(): T | null;
    min(): Node<T> | null;
    minKey(): number | null;
    minValue(): T | null;
    search(key: number): Node<T> | null;
    size(): number;
    toArray(): Node<T>[];
    toPairs(): [number, T][];
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
