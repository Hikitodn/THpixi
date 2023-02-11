import { Container } from "pixi.js";
import { WinUI } from "../UI/winUI";

export class GameWin extends Container {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.winUI = new WinUI();
    this.winUI.winScreen();
    this.addChild(this.winUI);
  }
}
