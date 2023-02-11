import { Application, Assets, Container } from "pixi.js";
import { GameScene } from "./scenes/gameScene";
import { gameSetting } from "./setting";
import manifest from "../assets/manifest.json";
import { GameOver } from "./scenes/gameOverScene";

export default class Game {
  constructor() {
    this.app = new Application({
      view: document.getElementById("main"),
      resolution: window.devicePixelRatio | 1,
      antialias: true,
      backgroundColor: 0x23232f,
      width: gameSetting.WIDTH,
      height: gameSetting.HEIGHT,
    });
    Assets.init({ manifest: manifest });
    this.gamePlay();
  }

  gamePlay() {
    // game scene
    this.gameScene = new GameScene();
    this.app.stage.addChild(this.gameScene);
  }
}
