import { Assets, Container, Sprite } from "pixi.js";

export class Dungeon extends Container {
  constructor() {
    super();
  }

  init() {
    Assets.load("dungeon").then((asset) => {
      const sprite = new Sprite(asset);
      this.addChild(sprite);
    });
  }
}
