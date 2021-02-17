import { Colors } from "@staff0rd/typescript";
import { Player } from "blocks/Player";
import { Resource } from "blocks/Resource";
import * as PIXI from "pixi.js";
import { Dispatch, Middleware } from "redux";
import { RootState } from "./rootReducer";
import * as gsap from "gsap";

import {
  addResource,
  arrived,
  dequeue,
  Destination,
  getResource,
  goAnywhere,
  goSomewhere,
} from "./gameSlice";
import { distancePoint } from "Geometry";

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

let resources: Resource[] = [];
const player = new Player(app.stage);

const movePlayer = (destination: Destination, dispatch: Dispatch) => {
  const distance = distancePoint(player, destination);
  const time = distance / player.pixelsPerSecond;
  gsap.TweenLite.to(player._view, time, {
    ...destination,
    ease: gsap.Power0.easeIn,
    onComplete: () => {
      dispatch(arrived(destination.resourceId));
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
      //const position = app.stage.toLocal(e.data.global);
    }
  );
  return (next) => (action) => {
    if (addResource.match(action)) {
      const { x, y } = action.payload;
      resources.push(
        new Resource(
          app.stage,
          {
            x: x / window.devicePixelRatio,
            y: y / window.devicePixelRatio,
          },
          action.payload.id
        )
      );
    } else if (arrived.match(action)) {
      if (action.payload) {
        const resourceId = action.payload!;
        const resource = resources.find((r) => r.id === resourceId)!;
        resource.remove();
        resources = resources.filter((r) => r.id !== resource.id);
      }
    } else if (goAnywhere.match(action) || goSomewhere.match(action)) {
      const { x, y } = action.payload;
      movePlayer({ x, y }, dispatch);
    } else if (getResource.match(action)) {
      if (getState().game.boardResources.length) {
        const performed = next(action);
        const destination = getState().game.destination!;
        movePlayer(destination, dispatch);
        return performed;
      } else {
        return dispatch(dequeue());
      }
    }
    return next(action);
  };
};
