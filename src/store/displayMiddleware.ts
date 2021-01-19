import { Colors, IPoint, Utils } from "@staff0rd/typescript";
import { Player } from "blocks/Player";
import { Resource } from "blocks/Resource";
import * as PIXI from "pixi.js";
import { Dispatch, Middleware } from "redux";
import { addResource } from "./resourceSlice";
import { RootState } from "./rootReducer";
import * as gsap from "gsap";
import { dequeue, goAnywhere, goSomewhere } from "./playerSlice";

export const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Colors.BlueGrey.C900,
});

app.stage.position.set(app.screen.width / 2, app.screen.height / 2);

window.onresize = () => {
  app.view.width = window.innerWidth;
  app.view.height = window.innerHeight;
};

const resources: Resource[] = [];
const player = new Player(app.stage);

const movePlayer = (destination: IPoint, dispatch: Dispatch) => {
  const distance = Utils.distance(player, destination);
  const time = distance / player.pixelsPerSecond;
  gsap.TweenLite.to(player._view, time, {
    ...destination,
    ease: gsap.Power0.easeIn,
    onComplete: () => {
      dispatch(dequeue());
    },
  });
};

export const displayMiddleware: Middleware<
  {}, // legacy type parameter added to satisfy interface signature
  RootState
> = ({ getState, dispatch }) => {
  (app.renderer.plugins.interaction as PIXI.InteractionManager).on(
    "pointerdown",
    (e: PIXI.InteractionEvent) => {
      const position = app.stage.toLocal(e.data.global);
      dispatch(addResource({ x: position.x, y: position.y }));
    }
  );
  return (next) => (action) => {
    if (addResource.match(action)) {
      const { x, y } = action.payload;
      resources.push(
        new Resource(app.stage, {
          x: x / window.devicePixelRatio,
          y: y / window.devicePixelRatio,
        })
      );
    } else if (goAnywhere.match(action) || goSomewhere.match(action)) {
      const { x, y } = action.payload;
      movePlayer({ x, y }, dispatch);
    }
    return next(action);
  };
};
