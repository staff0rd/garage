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
    goAnywhere: {
      reducer: (state, { payload: { x, y } }: PayloadAction<IPoint>) => {
        state.destination = {
          x,
          y,
        };
      },
      prepare: (bounds: IRectangle) => {
        const x = Random.between(bounds.x, bounds.x + bounds.width);
        const y = Random.between(bounds.y, bounds.y + bounds.height);
        return { payload: { x, y } };
      },
    },
    goSomewhere(state, { payload: point }: PayloadAction<IPoint>) {
      state.destination = point;
    },
  },
});

export const { queue, dequeue, goAnywhere, goSomewhere } = playerSlice.actions;

export default playerSlice.reducer;
