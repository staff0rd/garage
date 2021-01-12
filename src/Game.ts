import * as PIXI from "pixi.js";
import { Config } from "./store/appSlice";
import { Random, ColorUtils, Colors } from "@staff0rd/typescript";
import { generate, getNodes, getPointFromNodeId } from "./graph";
import createGraph, { Graph, Node } from "ngraph.graph";
import { Order } from "./store/orderScreenSlice";
import { Part } from "./store/appSlice";
import renderPixiGraph from "ngraph.pixi";

enum FloorType {
  Garage,
  Driveway,
}

type PartCount = {
  count: number;
} & Part;

interface NodeData {
  floorType: FloorType;
  inventory: PartCount[];
}

interface LinkData {}

interface Dictionary<T> {
  [Key: string]: T;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Game {
  private pixi: PIXI.Application;
  private config: Config;
  private parts: Part[];
  private graph: Graph<NodeData, LinkData> = createGraph();
  private floor: PIXI.Container;
  private floorColor = ColorUtils.randomColor("BlueGrey");
  private drivewayColor = Colors.BlueGrey.color();
  private tiles: Dictionary<PIXI.Container> = {};
  private thing: any;

  constructor(config: Config, parts: Part[], pixi: PIXI.Application) {
    PIXI.settings.RESOLUTION = window.devicePixelRatio;
    this.config = config;
    this.pixi = pixi;
    this.floor = new PIXI.Container();
    this.parts = parts;
    pixi.stage.addChild(this.floor);
    this.thing = renderPixiGraph(
      this.graph,
      undefined,
      this.pixi.renderer,
      this.floor
    );
    this.thing.run();
  }

  deliver(o: Order): boolean {
    const freeNode = getNodes(this.graph).find(
      (n) =>
        n.data.floorType === FloorType.Driveway &&
        (n.data.inventory.find((p) => p.id === o.partId) ||
          n.data.inventory.length < 4)
    );
    if (freeNode) {
      const existing = freeNode.data.inventory.find((p) => p.id === o.partId);
      if (existing) {
        existing.count += o.count;
      } else {
        freeNode.data.inventory.push({
          count: o.count,
          id: o.partId,
          name: o.name,
          symbol: this.parts.find((p) => p.id === o.partId)!.symbol,
        });
      }
    }
    if (freeNode) {
      this.drawNode(freeNode, true);
      return true;
    }
    return false;
  }

  // private grid(block: PIXI.Graphics, size: number) {
  //   const Xcount = block.width / size - 1;
  //   const yCount = block.height / size - 1;
  //   const g = new PIXI.Graphics()
  //   g.lineStyle(2, Colors.Black);
  //   for (let x = 1; x <= Xcount; x++) {
  //     g.moveTo(x * size, 0);
  //     g.lineTo(x * size, block.height);
  //   }
  //   for (let y = 1; y <= yCount; y++) {
  //     g.moveTo(0, y * size);
  //     g.lineTo(block.width, y * size);
  //   }
  //   block.addChild(g);
  // }

  init() {
    const graphWidth = Random.between(4, 7);
    const graphHeight = Random.between(4, 7);

    generate(
      0,
      0,
      graphWidth,
      graphHeight,
      (x, y) => ({ inventory: [], floorType: FloorType.Garage }),
      this.graph
    );
    const { nodes } = generate(
      0,
      -2,
      2,
      2,
      (x, y) => ({ inventory: [], floorType: FloorType.Driveway }),
      this.graph
    );
    console.log(`added ${nodes.length} driveway nodes`);

    this.draw();
  }

  private draw() {
    //const tileSize = this.config.tileSize;

    var layout = this.thing.layout;
    layout.pinNode(this.graph.getNode("0|0"), true);

    // getNodes(this.graph).forEach(n => {
    //   this.drawNode(n);
    // });

    //this.floor.position.set(this.pixi.screen.width / 2, this.pixi.screen.height / 2);
    //this.floor.pivot.set(this.floor.width / 2, (this.floor.height - 2 * tileSize) / 2);
  }

  getNodeContainer(id: string) {
    if (!this.tiles[id]) {
      const container = new PIXI.Container();
      container.interactive = true;
      container.interactiveChildren = false;
      container.buttonMode = true;
      this.tiles[id] = container;
      this.floor.addChild(container);
    }

    return this.tiles[id];
  }

  private drawNode(n: Node<NodeData>, p = false) {
    const container = this.getNodeContainer(n.id.toString());
    container.removeChildren();

    const tileSize = this.config.tileSize;
    const { x, y } = getPointFromNodeId(n.id);

    const color =
      n.data.floorType === FloorType.Garage
        ? this.floorColor
        : this.drivewayColor;
    const background = new PIXI.Graphics()
      .beginFill(color.shades[4].shade)
      .drawRect(x * tileSize, y * tileSize, tileSize, tileSize)
      .endFill();
    container.addChild(background);

    n.data.inventory.forEach((pc, ix) => {
      const rect: Rect = {
        x: x * tileSize,
        y: y * tileSize,
        width: tileSize / 2,
        height: tileSize / 2,
      };
      switch (ix) {
        case 0:
          break;
        case 1:
          rect.x += tileSize / 2;
          break;
        case 2:
          rect.y += tileSize / 2;
          break;
        case 3:
          rect.x += tileSize / 2;
          rect.y += tileSize / 2;
          break;
      }

      const inv = new PIXI.Graphics()
        .beginFill(Colors.Orange.C200)
        .drawRect(rect.x, rect.y, rect.width, rect.height);

      container.addChild(inv);

      const text = new PIXI.Text(pc.symbol, { fontSize: 14 });
      text.pivot.set(text.width / 2, text.height / 2);
      text.position.set(rect.x + tileSize / 4, rect.y + tileSize / 4);
      container.addChild(text);
    });
  }
}
