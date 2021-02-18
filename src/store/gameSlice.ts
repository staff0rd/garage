import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPoint, IRectangle, Random } from "@staff0rd/typescript";
import { distancePoint } from "Geometry";

export type Destination = {
  x: number;
  y: number;
  resourceId?: string;
};

export type Resource = {
  x: number;
  y: number;
  id: string;
  visible: boolean;
};

const initialState: {
  actions: any[];
  destination: Destination | undefined;
  position: IPoint;
  boardResources: Resource[];
  playerResources: Resource[];
} = {
  actions: [] as any[],
  destination: undefined,
  boardResources: [],
  playerResources: [],
  position: { x: 0, y: 0 },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    queue(state, action: PayloadAction<any>) {
      if (state.actions.length < 10) {
        state.actions = [...state.actions, action.payload];
      }
    },
    dequeue(state) {
      state.actions = state.actions.slice(1);
    },
    goAnywhere: {
      reducer: (state, { payload: { x, y } }: PayloadAction<IPoint>) => {
        state.destination = {
          x,
          y,
        };
      },
      prepare: (bounds: IRectangle) => {
        return { payload: getRandomBoardPosition(bounds) };
      },
    },
    arrived(state, { payload: resource }: PayloadAction<string | undefined>) {
      if (resource)
        state.boardResources = state.boardResources.filter(
          (r) => r.id !== resource
        );

      state.position = { x: state.destination!.x, y: state.destination!.y };
      state.destination = undefined;
    },
    goSomewhere(state, { payload: point }: PayloadAction<IPoint>) {
      state.destination = { x: point.x, y: point.y };
    },
    addResource(state, action: PayloadAction<Resource>) {
      const newResources = [...state.boardResources, action.payload];
      console.log("resources:", newResources.length);
      return {
        ...state,
        boardResources: newResources,
      };
    },
    discoverResource(state, action: PayloadAction<Resource>) {
      state.boardResources.find(
        (r) => r.id === action.payload.id
      )!.visible = true;
    },
    getResource(state) {
      const resourcesCloseBy = state.boardResources
        .filter((r) => r.visible)
        .map((r) => ({
          d: distancePoint(state.position, r),
          x: r.x,
          y: r.y,
          resourceId: r.id,
        }))
        .sort((a, b) => a.d - b.d);
      if (resourcesCloseBy.length) {
        const { x, y, resourceId } = resourcesCloseBy[0];
        state.destination = {
          x,
          y,
          resourceId,
        };
      }
    },
  },
});

export const {
  queue,
  dequeue,
  goAnywhere,
  goSomewhere,
  addResource,
  arrived,
  getResource,
  discoverResource,
} = gameSlice.actions;

export default gameSlice.reducer;

export function getRandomBoardPosition(bounds: IRectangle) {
  const x = Random.between(bounds.x, bounds.x + bounds.width);
  const y = Random.between(bounds.y, bounds.y + bounds.height);
  return { x, y };
}
