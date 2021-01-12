import { IPoint, IRectangle } from "@staff0rd/typescript";

export const shrink = (rect: IRectangle, by: number): IRectangle => ({
  x: rect.x + by,
  y: rect.y + by,
  width: rect.width - 2 * by,
  height: rect.height - 2 * by,
});

export const center = (
  rect: IRectangle,
  on: IPoint = { x: 0, y: 0 }
): IRectangle => ({
  x: on.x - rect.width / 2,
  y: on.y - rect.height / 2,
  width: rect.width,
  height: rect.height,
});
