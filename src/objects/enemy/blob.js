import { Assets, Container, Sprite } from "pixi.js";

export class Blob extends Container {
  constructor() {
    super();
  }

  init(posX, posY) {
    Assets.load("blob").then((asset) => {
      const sprite = new Sprite(asset);
      sprite.x = posX;
      sprite.y = posY;
      this.addChild(sprite);
      return sprite;
    });
  }
}
