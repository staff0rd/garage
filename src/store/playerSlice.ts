import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPoint, IRectangle, Random } from "@staff0rd/typescript";

const initialState: {
  actions: any[];
  destination: IPoint | undefined;
} = {
  actions: [] as any[],
  destination: undefined,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    queue(state, action: PayloadAction<any>) {
      state.actions = [...state.actions, action.payload];
    },
    dequeue(state) {
      state.actions = state.actions.slice(1);
    },
    goAnywhere(state, { payload: bounds }: PayloadAction<IRectangle>) {
      state.destination = {
        x: Random.between(bounds.x, bounds.x + bounds.width),
        y: Random.between(bounds.y, bounds.y + bounds.height),
      };
    },
    goSomewhere(state, { payload: point }: PayloadAction<IPoint>) {
      state.destination = point;
    },
  },
});

export const { queue, dequeue, goAnywhere, goSomewhere } = playerSlice.actions;

export default playerSlice.reducer;
