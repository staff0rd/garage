import { combineReducers } from "@reduxjs/toolkit";
import buyScreenReducer from "./buyScreenSlice";
import orderScreenReducer from "./orderScreenSlice";
import appReducer from "./appSlice";
import playerReducer from "./playerSlice";
import notificationReducer from "./notificationSlice";

export const rootReducer = combineReducers({
  app: appReducer,
  buyScreen: buyScreenReducer,
  orderScreen: orderScreenReducer,
  notification: notificationReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
