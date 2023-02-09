import { Assets, Container, Ticker } from "pixi.js";
import { gameSetting } from "../setting";
import { Door } from "../objects/map/door";
import { Dungeon } from "../objects/map/dungeon";
import { Treasure } from "../objects/map/treasure";
import { Explorer } from "../objects/player/explorer";
import { BlobController } from "../objects/enemy/blobController";
import { contain } from "../ultis/ulti";

export class GameScene extends Container {
  constructor() {
    super();
    Assets.backgroundLoadBundle("game-screen");
    this.setup();
  }

  setup() {
    this.initDungeon();
    this.initDoor();
    this.initTreasure();
    this.initExplorer();
    this.initBlob();

    Ticker.shared.add(this.update.bind(this));
  }

  update(dt) {
    // player logic
    this.explorer.x += this.explorer.vx;
    this.explorer.y += this.explorer.vy;

    const playerHitWall = contain(this.explorer, {
      x: 30,
      y: 10,
      width: 480,
      height: 480,
    });

    if (playerHitWall === "top" || playerHitWall === "bottom") {
      this.explorer.vy = 0;
    } else if (playerHitWall === "left" || playerHitWall === "right") {
      this.explorer.vx = 0;
    }

    // enemies logic
    this.blob.enemies.forEach((blob) => {
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

  initDungeon() {
    this.dungeon = new Dungeon();
    this.dungeon.init();
    this.addChild(this.dungeon);
  }

  initDoor() {
    this.door = new Door();
    this.door.init();
    this.door.x = 32;
    this.addChild(this.door);
  }

  initTreasure() {
    this.treasure = new Treasure();
    this.treasure.init();
    this.treasure.x = gameSetting.WIDTH - this.treasure.width - 60;
    this.treasure.y = gameSetting.HEIGHT / 2 - this.treasure.height / 2;
    this.addChild(this.treasure);
  }

  initExplorer() {
    this.explorer = new Explorer();
    this.explorer.init();
    this.explorer.x = 68;
    this.explorer.y = gameSetting.HEIGHT / 2 - this.explorer.height / 2;
    this.explorer.movement();
    this.addChild(this.explorer);
  }

  initBlob() {
    this.blob = new BlobController();
    this.blob.inits(6, 0, 1);
    // this.blob.movement();
    this.addChild(this.blob);
  }
}
