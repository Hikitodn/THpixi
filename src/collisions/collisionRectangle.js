import { Collision } from "./collision";

export class CollisionRect extends Collision {
  constructor(x, y, width, height) {
    super(rect, x, y);
    this.width = width;
    this.height = height;
  }
}
