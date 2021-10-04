import { IRectangle, Random } from "@staff0rd/typescript";
import { center, shrink } from "Geometry";

export class BoardManager {
  private _bounds: IRectangle;
  public get bounds() {
    return this._bounds;
  }
  constructor(bounds: IRectangle) {
    this._bounds = bounds;
  }

  static fromApp(app: PIXI.Application) {
    return new BoardManager(shrink(center(app.screen), 10));
  }

  getRandomBoardPosition() {
    const x = Random.between(
      this._bounds.x,
      this._bounds.x + this._bounds.width
    );
    const y = Random.between(
      this._bounds.y,
      this._bounds.y + this._bounds.height
    );
    return { x, y };
  }
}
