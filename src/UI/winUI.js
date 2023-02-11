import { Container, Text, TextStyle } from "pixi.js";
import { gameSetting } from "../setting";

export class WinUI extends Container {
  winScreen() {
    let textStyle = new TextStyle({
      fontSize: 48,
      fill: "0xffffff",
    });
    let text = new Text("YOU WIN", textStyle);
    text.anchor.set(0.5);
    text.x = gameSetting.WIDTH / 2;
    text.y = gameSetting.HEIGHT / 2;
    this.addChild(text);
  }
}
