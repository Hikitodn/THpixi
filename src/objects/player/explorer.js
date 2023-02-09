import { Assets, Container, Sprite } from "pixi.js";
import { Keyboard } from "../../input/keyboard";

export class Explorer extends Container {
  constructor() {
    super();
    this.vx = 0;
    this.vy = 0;
  }

  init() {
    Assets.load("explorer").then((asset) => {
      const sprite = new Sprite(asset);
      this.addChild(sprite);
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
      console.log(this.vx);
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
}
