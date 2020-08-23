import { combineReducers } from '@reduxjs/toolkit'
import buyScreenReducer from './buyScreenSlice';
import appReducer from './appSlice';

export const rootReducer = combineReducers({
    app: appReducer,
    buyScreen: buyScreenReducer
})

export type RootState = ReturnType<typeof rootReducer>
