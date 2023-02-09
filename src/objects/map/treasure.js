import { Assets, Container, Sprite } from "pixi.js";

export class Treasure extends Container {
  constructor() {
    super();
  }

  init() {
    Assets.load("treasure").then((asset) => {
      const sprite = new Sprite(asset);
      this.addChild(sprite);
    });
  }
}
