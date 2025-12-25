
class Vector<N extends Vector.Number = Vector.Number> {
  x: N;
  y: N;

  constructor(x?: N, y?: N) {
    this.x = x || 0 as N;
    this.y = y || 0 as N;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}

namespace Vector {
  export type Number = number; // TODO: investigate tuples of different data sizes
}

export {
  Vector
};
