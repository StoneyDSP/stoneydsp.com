class Array<T> extends globalThis.Array<T> {
  public clear(): void {
    this.length = 0;
  }
}

declare namespace Array {
  export interface Like<T> extends globalThis.ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
  }
}

export { Array };
