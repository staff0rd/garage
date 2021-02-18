import { Colors } from "@staff0rd/typescript";
import { Player } from "blocks/Player";
import { ResourceBlock } from "blocks/ResourceBlock";
import * as PIXI from "pixi.js";
import { Dispatch, Middleware } from "redux";
import { RootState } from "./rootReducer";
import * as gsap from "gsap";

import {
  addResource,
  arrived,
  dequeue,
  Destination,
  discoverResource,
  getResource,
  goAnywhere,
  goSomewhere,
  Resource,
} from "./gameSlice";
import { distance, distancePoint } from "Geometry";

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

let resources: ResourceBlock[] = [];
const player = new Player(app.stage);

const movePlayer = (
  destination: Destination,
  getResources: () => Resource[],
  dispatch: Dispatch
) => {
  const time = distancePoint(player, destination) / player.pixelsPerSecond;
  gsap.TweenLite.to(player._view, time, {
    ...destination,
    ease: gsap.Power0.easeIn,
    onUpdate: () => {
      getResources()
        .filter((r) => !r.visible)
        .filter((r) => isResourceVisible(r))
        .forEach((r) => {
          dispatch(discoverResource(r));
        });
    },
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
  const getResources = () => getState().game.boardResources;
  (app.renderer.plugins.interaction as PIXI.InteractionManager).on(
    "pointerdown",
    (e: PIXI.InteractionEvent) => {
      //const position = app.stage.toLocal(e.data.global);
    }
  );
  return (next) => (action) => {
    if (addResource.match(action)) {
      action.payload.visible = isResourceVisible(action.payload);
      const { x, y } = action.payload;
      resources.push(
        new ResourceBlock(
          app.stage,
          {
            x: x / window.devicePixelRatio,
            y: y / window.devicePixelRatio,
          },
          action.payload.id,
          action.payload.visible
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
      movePlayer({ x, y }, getResources, dispatch);
    } else if (getResource.match(action)) {
      const performed = next(action);
      const destination = getState().game.destination;
      if (destination) {
        movePlayer(destination, getResources, dispatch);
        return performed;
      } else {
        return dispatch(dequeue());
      }
    } else if (discoverResource.match(action)) {
      resources.find((r) => r.id === action.payload.id)!.discover();
    }
    return next(action);
  };
};

const isResourceVisible = (r: Resource): boolean => {
  return distance(r.x, r.y, player.x, player.y) <= Player._fogSize;
};
