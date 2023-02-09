import { Assets, Container, Sprite } from "pixi.js";

export class Blob extends Container {
  constructor() {
    super();
  }

  init(posX, posY, vx, vy) {
    let result = Assets.load("blob").then((asset) => {
      let sprite = new Sprite(asset);
      sprite.x = posX;
      sprite.y = posY;
      sprite.vx = vx;
      sprite.vy = vy;
      this.addChild(sprite);
      return sprite;
    });
    return result;
  }
}
