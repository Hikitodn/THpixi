import { Blob } from "./blob";
import { contain, randomInt } from "../../ultis/ulti";
import { gameSetting } from "../../setting";

export class BlobController extends Blob {
  constructor() {
    super();
    this.enemies = [];
  }

  inits(numberMob, vx, vy) {
    for (let i = 0; i < numberMob; i++) {
      let posX = 48 * i + 150;
      let posY = randomInt(30, gameSetting.HEIGHT - 80);
      let enemy = this.init(posX, posY, vx, vy);
      this.enemies.push(enemy);
    }
  }

  movement() {
    this.enemies.forEach((blob) => {
      blob.then((enemy) => {
        enemy.y += enemy.vy;

        const enemyHitWall = contain(enemy, {
          x: 28,
          y: 30,
          width: 488,
          height: 480,
        });

        if (enemyHitWall === "top" || enemyHitWall === "bottom") {
          enemy.vy *= -1;
        }
      });
    });
  }

  update(dt) {
    this.movement();
  }
}
