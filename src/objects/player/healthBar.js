import { Container, Graphics } from "pixi.js";

export class HealthBar extends Container {
  constructor() {
    super();
    this.outerBar = undefined;
  }
  init() {
    //Create the black background rectangle
    const innerBar = new Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    this.addChild(innerBar);

    //Create the front red rectangle
    const outerBar = new Graphics();
    outerBar.beginFill(0xff3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    this.addChild(outerBar);

    this.outerBar = outerBar;
  }
}
