import * as PIXI from "pixi.js"
import { Config } from './store/appSlice';
import { Random, ColorUtils, Colors } from '@staff0rd/typescript';
import { generate, getNodes, getPointFromNodeId } from './graph';
import createGraph, { Graph } from 'ngraph.graph';
import { Order } from "./store/orderScreenSlice";

enum FloorType {
  Garage,
  Driveway,
}

interface NodeData {
  floorType: FloorType
}

interface LinkData {

}

export class Game {
  private pixi: PIXI.Application;
  private config: Config;
  private graph: Graph<NodeData, LinkData> = createGraph();
  private floor: PIXI.Container;

  constructor(config: Config, pixi: PIXI.Application) {
    this.config = config;
    this.pixi = pixi;
    this.floor = new PIXI.Container();
    pixi.stage.addChild(this.floor);
  }

  deliver(o: Order) {
    throw new Error("Method not implemented.");
  }

  grid(block: PIXI.Graphics, size: number) {
    const Xcount = block.width / size - 1;
    const yCount = block.height / size - 1;
    const g = new PIXI.Graphics()
    g.lineStyle(2, Colors.Black);
    for (let x = 1; x <= Xcount; x++) {
      g.moveTo(x * size, 0);
      g.lineTo(x * size, block.height);
    }
    for (let y = 1; y <= yCount; y++) {
      g.moveTo(0, y * size);
      g.lineTo(block.width, y * size);
    }
    block.addChild(g);
  }

  init() {
    const graphWidth = Random.between(4, 7);
    const graphHeight = Random.between(4, 7);

    generate(0, 0, graphWidth, graphHeight, (x, y) => ({ floorType: FloorType.Garage }), this.graph);
    const { nodes } = generate(0, -2, 2, 2, (x, y) => ({ floorType: FloorType.Driveway }), this.graph);
    console.log(`added ${nodes.length} driveway nodes`)

    this.draw();
  }

  draw() {
    const floorColor = ColorUtils.randomColor("BlueGrey").shades[4].shade;
    const drivewayColor = Colors.BlueGrey.C200;
    const tileSize = this.config.tileSize;

    getNodes(this.graph).forEach(n => {
      const { x, y } = getPointFromNodeId(n.id);
      const tile = new PIXI.Graphics()
        .beginFill(n.data.floorType === FloorType.Garage ? floorColor : drivewayColor)
        .drawRect(x * tileSize, y * tileSize, tileSize, tileSize);
      tile.interactive = true;
      tile.buttonMode = true;
      this.floor.addChild(tile);
    });

    this.floor.position.set(this.pixi.screen.width / 2, this.pixi.screen.height / 2);
    this.floor.pivot.set(this.floor.width / 2, (this.floor.height - 2 * tileSize) / 2);
  }
}