import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPoint } from "@staff0rd/typescript";

const initialState: {
  resources: IPoint[];
} = {
  resources: [],
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    addResource(state, action: PayloadAction<IPoint>) {
      return {
        resources: [...state.resources, action.payload],
      };
    },
  },
});

export const { addResource } = resourceSlice.actions;

export default resourceSlice.reducer;
