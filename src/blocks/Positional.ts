import { IPoint } from "@staff0rd/typescript";
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

  public setPosition(point: IPoint) {
    this.x = point.x;
    this.y = point.y;
  }

  _view: PIXI.Container = new PIXI.Container();
  protected _g: PIXI.Graphics = new PIXI.Graphics();

  constructor(parent: PIXI.Container, position: IPoint = { x: 0, y: 0 }) {
    parent.addChild(this._view);
    this._view.addChild(this._g);
    this.setPosition(position);
    this.draw();
  }

  abstract draw(): void;
}
