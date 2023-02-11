import { Container } from "pixi.js";
import { OverUI } from "../UI/overUI";

export class GameOver extends Container {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.overUI = new OverUI();
    this.overUI.overScreen();
    this.addChild(this.overUI);
  }
}
