import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Config {
    tileSize: number;
    offerRefreshSeconds: number
    checkOrdersMilliseconds: number
}

interface Part {
    id: number;
    name: string;
    symbol: string;
}

type AppState = {
    config: Config
    money: number,
    parts: Part[],
}

const getParts: () => Part[] = () => [...Array(8)].map((i, ix) => ({
        name: `Widget ${String.fromCharCode(65 + ix)}`,
        id: ix, 
        symbol: String.fromCharCode(65 + ix),
    }));

export const initialState: AppState = {
    config: {
        tileSize: 50,
        offerRefreshSeconds: 10,
        checkOrdersMilliseconds: 250,
    },
    money: 500,
    parts: getParts(),
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfig (state, { payload }: PayloadAction<Config>) {
            state.config = payload;
        },
        addMoney(state, { payload }: PayloadAction<number>) {
            state.money += payload;
        },
        removeMoney(state, { payload }: PayloadAction<number>) {
            state.money -= payload;
        }

    }
});

export const {
    setConfig,
    addMoney,
    removeMoney,
} = appSlice.actions;

export default appSlice.reducer;