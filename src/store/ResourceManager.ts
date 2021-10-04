import { ResourceBlock } from "blocks/ResourceBlock";

const ADD_RESOURCE_AT = 500;

export class ResourceManager {
  private lastUpdate: undefined | Date;
  private cumulativeUpdate = 0;
  private _resourcesAdded: number = 0;
  private app: PIXI.Application;
  private resources: ResourceBlock[] = [];

  public get resourcesAdded(): number {
    return this._resourcesAdded;
  }
  public set resourcesAdded(v: number) {
    this._resourcesAdded = v;
  }

  constructor(app: PIXI.Application) {
    this.lastUpdate = undefined;
    this.cumulativeUpdate = 0;
    this.app = app;
  }

  startingUpdate() {
    this.lastUpdate = undefined;
  }

  update() {
    if (this.lastUpdate) {
      this.cumulativeUpdate += new Date().getTime() - this.lastUpdate.getTime();
    }
    const shouldHave = Math.round(this.cumulativeUpdate / 1000);
    this.lastUpdate = new Date();

    if (shouldHave > this.resourcesAdded) {
      this.resourcesAdded++;
      return true;
    }
    return false;
  }

  remove(id: string) {
    const resource = this.resources.find((r) => r.id === id)!;
    resource.remove();
    this.resources = this.resources.filter((r) => r.id !== resource.id);
  }

  add(id: string, x: number, y: number, visible: boolean) {
    this.resources.push(
      new ResourceBlock(
        this.app.stage,
        {
          x: x / window.devicePixelRatio,
          y: y / window.devicePixelRatio,
        },
        id,
        visible
      )
    );
  }

  discover(id: string) {
    this.resources.find((r) => r.id === id)?.discover();
  }
}
