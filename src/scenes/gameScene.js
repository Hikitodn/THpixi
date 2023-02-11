import { Assets, Container, Ticker } from "pixi.js";
import { gameSetting } from "../setting";
import { Door } from "../objects/map/door";
import { Dungeon } from "../objects/map/dungeon";
import { Treasure } from "../objects/map/treasure";
import { Explorer } from "../objects/player/explorer";
import { BlobController } from "../objects/enemy/blobController";
import { HealthBar } from "../objects/player/healthBar";
import { RectCollider } from "../collisions/rect_collider";
import { GameOver } from "./gameOverScene";
import { GameWin } from "./gameWinScene";

export class GameScene extends Container {
  constructor() {
    super();
    Assets.backgroundLoadBundle("game-screen");
    this.gameContainer = new Container();
    this.addChild(this.gameContainer);
    this.setup();
  }

  setup() {
    this.initDungeon();
    this.initDoor();
    this.initTreasure();
    this.initExplorer();
    this.initBlob();
    this.initGameOver();
    this.initWin();

    Ticker.shared.add(this.update.bind(this));
  }

  update(dt) {
    // player logic
    this.explorer.update(dt);

    // enemies logic
    this.blob.update(dt);

    this.blob.enemies.forEach((enemy) => {
      enemy.then((e) => {
        let enemyCollider = new RectCollider();
        let isColliding = enemyCollider.rectCollider(this.explorer, e);
        if (isColliding) {
          this.health.outerBar.width -= 2;
        }

        if (this.health.outerBar.width == 0) {
          Ticker.shared.stop();
          this.gameContainer.visible = false;
          this.gameOverScene.visible = true;
        }
      });
    });

    // check if carrying chest
    let isCarrying;
    let treasureCollider = new RectCollider();
    isCarrying = treasureCollider.rectCollider(this.explorer, this.treasure);
    this.explorer.explorer.then((player) => {
      if (isCarrying) {
        this.treasure.x = player.x;
        this.treasure.y = player.y;
      }
    });

    // check if condition is sastify to win
    let doorCollider = new RectCollider();
    let doorColliding = doorCollider.rectCollider(this.explorer, this.door);
    if (doorColliding && isCarrying) {
      this.gameContainer.visible = false;
      this.gameWinScene.visible = true;
    }
  }

  initDungeon() {
    this.dungeon = new Dungeon();
    this.dungeon.init();
    this.gameContainer.addChild(this.dungeon);
  }

  initDoor() {
    this.door = new Door();
    this.door.init();
    this.door.x = 32;
    this.gameContainer.addChild(this.door);
  }

  initTreasure() {
    this.treasure = new Treasure();
    this.treasure.init();
    this.treasure.x = gameSetting.WIDTH - this.treasure.width - 60;
    this.treasure.y = gameSetting.HEIGHT / 2 - this.treasure.height / 2;
    this.gameContainer.addChild(this.treasure);
  }

  initExplorer() {
    this.explorer = new Explorer();
    this.explorer.init();
    this.explorer.movement();
    this.gameContainer.addChild(this.explorer);

    //Create the health bar
    this.health = new HealthBar();
    this.health.init();
    const healthBar = new Container();
    healthBar.addChild(this.health);
    healthBar.position.set(gameSetting.WIDTH - 170, 4);
    this.gameContainer.addChild(healthBar);
  }

  initBlob() {
    this.blob = new BlobController();
    this.blob.inits(6, 0, 1);
    // this.blob.movement();
    this.gameContainer.addChild(this.blob);
  }

  initGameOver() {
    this.gameOverScene = new GameOver();
    this.gameOverScene.visible = false;
    this.addChild(this.gameOverScene);
  }

  initWin() {
    this.gameWinScene = new GameWin();
    this.gameWinScene.visible = false;
    this.addChild(this.gameWinScene);
  }
}
