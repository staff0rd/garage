import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Config {
    tileSize: number;
    offerRefreshSeconds: number
}

type AppState = {
    config: Config
}

export const initialState: AppState = {
    config: {
        tileSize: 50,
        offerRefreshSeconds: 10,
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfig (state, action: PayloadAction<Config>) {
            state.config = action.payload;
        }
    }
});

export const {
    setConfig
} = appSlice.actions;

export default appSlice.reducer;