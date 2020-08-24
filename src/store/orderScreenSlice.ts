import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
    id: string,
    partId: number,
    arriving: number,
    cost: number,
    count: number,
    name: string,
}

type OrderScreenSate = {
    show: boolean,
    orders: Order[],
}

const initialState: OrderScreenSate = {
    show: false,
    orders: [],
}

const buyScreenSlice = createSlice({
    name: 'orderScreen',
    initialState,
    reducers: {
        show(state) {
            state.show = true;
        },
        hide(state) {
            state.show = false;
        },
        addOrder(state, action: PayloadAction<Order>) {
            state.orders = [...state.orders, action.payload];
        },
        removeOrder(state, { payload }: PayloadAction<string>) {
            state.orders = state.orders.filter(o => o.id !== payload);
        },
    }
});

export const {
    show,
    hide,
    addOrder,
    removeOrder,
} = buyScreenSlice.actions;

export default buyScreenSlice.reducer;