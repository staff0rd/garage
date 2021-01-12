import { Colors } from "@staff0rd/typescript";
import * as PIXI from "pixi.js";

export class Player {
  private _x: number = 0;
  public get x(): number {
    return this._x;
  }
  public set x(v: number) {
    this._x = v;
  }

  private _y: number = 0;
  public get y(): number {
    return this._y;
  }
  public set y(v: number) {
    this._y = v;
  }

  private _view: PIXI.Graphics = new PIXI.Graphics();
  private static _size = 10;

  constructor(parent: PIXI.Container) {
    parent.addChild(this._view);
    this.draw();
  }

  draw() {
    this._view
      .clear()
      .lineStyle(2, Colors.Black)
      .beginFill(Colors.Red.C500)
      .drawCircle(this.x, this.y, Player._size)
      .endFill();
  }
}
