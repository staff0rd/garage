import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Random } from "@staff0rd/typescript";

export type BuyableItem = {
    id: string,
    name: string,
    cost: number,
    costPerUnit: number,
    count: number,
    partId: number,
};

type BuyScreenState = {
    show: boolean,
    offers: BuyableItem[],
    offerRefresh: number,
}

const getOffers = () => [...Array(8)].map((i, ix) => {
    const item = {
        name: `Widget ${String.fromCharCode(65 + ix)}`,
        id: ix.toString(),
        cost: 0,
        costPerUnit: Random.between(2, 10),
        count: Random.between(10, 100),
        partId: ix
    } as BuyableItem;
    item.cost = item.costPerUnit * item.count;
    return item;
});

const initialState: BuyScreenState = {
    show: false,
    offers: [],
    offerRefresh: new Date().getTime(),
}

const buyScreenSlice = createSlice({
    name: 'buyScreen',
    initialState,
    reducers: {
        show(state) {
            state.show = true;
        },
        hide(state) {
            state.show = false;
        },
        removeOffer(state, { payload }: PayloadAction<string>) {
            state.offers = state.offers.filter(o => o.id !== payload);
        },
        refreshOffers(state, action: PayloadAction<number>) {
            state.offers = getOffers();
            state.offerRefresh = action.payload;
        }
    }
});

export const {
    show,
    hide,
    removeOffer,
    refreshOffers,
} = buyScreenSlice.actions;

export default buyScreenSlice.reducer;