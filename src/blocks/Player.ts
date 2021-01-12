import { Colors } from "@staff0rd/typescript";
import * as PIXI from "pixi.js";

export class Player {
  pixelsPerSecond = 50;
  public get x(): number {
    return this._view.x;
  }
  public set x(v: number) {
    this._view.x = v;
  }
  public get y(): number {
    return this._view.y;
  }
  public set y(v: number) {
    this._view.y = v;
  }

  _view: PIXI.Container = new PIXI.Container();
  private _g: PIXI.Graphics = new PIXI.Graphics();
  private static _size = 10;

  constructor(parent: PIXI.Container) {
    parent.addChild(this._view);
    this._view.addChild(this._g);
    this.draw();
  }

  draw() {
    this._g
      .clear()
      .lineStyle(2, Colors.Black)
      .beginFill(Colors.Red.C500)
      .drawCircle(this.x, this.y, Player._size)
      .endFill();
  }
}
