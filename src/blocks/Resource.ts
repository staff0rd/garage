import { Colors } from "@staff0rd/typescript";
import { Positional } from "./Positional";

export class Resource extends Positional {
  private static _size = 10;
  draw() {
    this._g
      .clear()
      .lineStyle(2, Colors.Black)
      .beginFill(Colors.Green.C500)
      .drawCircle(this.x, this.y, Resource._size)
      .endFill();
  }
}
