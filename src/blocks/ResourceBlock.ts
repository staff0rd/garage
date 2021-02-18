import { Colors, IPoint } from "@staff0rd/typescript";
import { Positional } from "./Positional";

export class ResourceBlock extends Positional {
  private _visible = false;
  private static _size = 5;
  constructor(
    parent: PIXI.Container,
    position: IPoint,
    id: string,
    visible: boolean
  ) {
    super(parent, position, id);
    this._visible = visible;
  }
  discover() {
    this._visible = true;
    this.draw();
  }
  draw() {
    if (this._visible) {
      this._g
        .clear()
        .beginFill(Colors.Green.C500)
        .drawCircle(this.x, this.y, ResourceBlock._size)
        .endFill();
    }
  }
}
