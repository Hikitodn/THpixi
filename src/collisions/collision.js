import { EventEmitter } from "@pixi/utils";

export class Collision extends EventEmitter {
  constructor(type, x, y) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.id = Date.now();
  }

  checkCollision(objectToCheck) {
    throw new Error("Must override checkCollision");
  }
}
