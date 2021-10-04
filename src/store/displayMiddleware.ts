import { Colors } from "@staff0rd/typescript";
import { Player } from "blocks/Player";
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
import { ResourceManager } from "./ResourceManager";

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

const player = new Player(app.stage);
const resourceManager = new ResourceManager(app);

const movePlayer = (
  destination: Destination,
  getResources: () => Resource[],
  dispatch: Dispatch
) => {
  const time = distancePoint(player, destination) / player.pixelsPerSecond;
  resourceManager.startingUpdate();
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
      resourceManager.update();
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
      const visible = isResourceVisible(action.payload);
      const { x, y, id } = action.payload;
      resourceManager.add(id, x, y, visible);
    } else if (arrived.match(action)) {
      if (action.payload) {
        const resourceId = action.payload!;
        resourceManager.remove(resourceId);
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
      resourceManager.discover(action.payload.id);
    }
    return next(action);
  };
};

const isResourceVisible = (r: Resource): boolean => {
  return distance(r.x, r.y, player.x, player.y) <= Player._fogSize;
};
