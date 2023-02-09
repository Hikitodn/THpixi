import { Assets, Container, Sprite } from "pixi.js";

export class Door extends Container {
  constructor() {
    super();
  }

  init() {
    Assets.load("door").then((asset) => {
      const sprite = new Sprite(asset);
      this.addChild(sprite);
    });
  }
}
