import { Assets, Container, Sprite } from "pixi.js";
import { Keyboard } from "../../input/keyboard";
import { gameSetting } from "../../setting";
import { contain } from "../../ultis/ulti";

export class Explorer extends Container {
  constructor() {
    super();
    this.vx = 0;
    this.vy = 0;
  }

  init() {
    this.explorer = Assets.load("explorer").then((asset) => {
      let sprite = new Sprite(asset);
      sprite.x = 68;
      sprite.y = gameSetting.HEIGHT / 2 - sprite.height / 2;
      this.addChild(sprite);
      return sprite;
    });
  }

  movement() {
    const left = Keyboard.control("ArrowLeft"),
      up = Keyboard.control("ArrowUp"),
      right = Keyboard.control("ArrowRight"),
      down = Keyboard.control("ArrowDown");

    //Left arrow key `press` method
    left.press = () => {
      //Change the cat's velocity when the key is pressed
      this.vx = -3;
      this.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    //Up
    up.press = () => {
      this.vy = -3;
      this.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };

    //Right
    right.press = () => {
      this.vx = 3;
      this.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    //Down
    down.press = () => {
      this.vy = 3;
      this.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };
  }

  update(dt) {
    this.explorer.then((player) => {
      player.x += this.vx;
      player.y += this.vy;

      const playerHitWall = contain(player, {
        x: 30,
        y: 10,
        width: 480,
        height: 480,
      });

      if (playerHitWall === "top" || playerHitWall === "bottom") {
        this.vy = 0;
      } else if (playerHitWall === "left" || playerHitWall === "right") {
        this.vx = 0;
      }
    });
  }
}
