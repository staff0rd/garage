import * as PIXI from "pixi.js";

export abstract class Positional {
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
  protected _g: PIXI.Graphics = new PIXI.Graphics();

  constructor(parent: PIXI.Container) {
    parent.addChild(this._view);
    this._view.addChild(this._g);
    this.draw();
  }

  abstract draw(): void;
}
