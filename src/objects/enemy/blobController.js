import { Blob } from "./blob";
import { randomInt } from "../../ultis/ulti";
import { gameSetting } from "../../setting";

export class BlobController extends Blob {
  constructor() {
    super();
    this.enemies = [];
  }

  inits(numberMob) {
    this.blob = new Blob();
    this.addChild(this.blob);
    for (let i = 0; i < numberMob; i++) {
      let posX = 48 * i + 150;
      let posY = randomInt(30, gameSetting.HEIGHT - 80);
      let enemy = this.blob.init(posX, posY);
      this.enemies.push(enemy);
    }
  }
}
