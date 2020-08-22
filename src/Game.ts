import * as PIXI from "pixi.js"
import { Config } from "./Config";
import { Random } from "./core/Random";
import { ColorUtils } from "./core/Colors";

export class Game {
    private pixi: PIXI.Application;
    private config: Config;

    constructor(config: Config, pixi: PIXI.Application) {
        this.config = config;
        this.pixi = pixi;
    }

    init() {
        const width = Random.between(4, 7) * this.config.tileSize;
        const height = Random.between(4, 7) * this.config.tileSize;
        const color = ColorUtils.randomColor("BlueGrey");

        const g = new PIXI.Graphics();
        g.beginFill(color.shades[4].shade)
            .drawRect(0, 0, width, height);
        g.position.set(this.pixi.screen.width / 2, this.pixi.screen.height / 2);
        g.pivot.set(width/2, height/2);
        g.buttonMode = true;
        g.interactive = true;
        this.pixi.stage.addChild(g);
    }
}