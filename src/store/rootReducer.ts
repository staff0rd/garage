import { combineReducers } from '@reduxjs/toolkit'
import buyScreenReducer from './buyScreenSlice';
import orderScreenReducer from './orderScreenSlice';
import appReducer from './appSlice';

export const rootReducer = combineReducers({
    app: appReducer,
    buyScreen: buyScreenReducer,
    orderScreen: orderScreenReducer,
})

export type RootState = ReturnType<typeof rootReducer>
