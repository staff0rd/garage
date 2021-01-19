import { Colors } from "@staff0rd/typescript";
import { Positional } from "./Positional";

export class Player extends Positional {
  pixelsPerSecond = 100;
  private static _size = 10;
  draw() {
    this._g
      .clear()
      .lineStyle(2, Colors.Black)
      .beginFill(Colors.Red.C500)
      .drawCircle(this.x, this.y, Player._size)
      .endFill();
  }
}
