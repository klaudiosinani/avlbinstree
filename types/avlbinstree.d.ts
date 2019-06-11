declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    value: T;
    left: Instance<T> | null;
    right: Instance<T> | null;
    readonly key: number;
    readonly children: Instance<T>[];
    readonly degree: 0 | 1 | 2;
    isFull(): boolean;
    isInternal(): boolean;
    isLeaf(): boolean;
    isLeftPartial(): boolean;
    isPartial(): boolean;
    isRightPartial(): boolean;
    toPair(): [number, T];
  }
}

declare namespace tree {
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {
    readonly root: Node<T> | null;
    clear(): this;
    includes(key: number): boolean;
    isEmpty(): boolean;
    max(): Node<T> | null;
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
