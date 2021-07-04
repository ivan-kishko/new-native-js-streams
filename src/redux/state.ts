import { combineReducers, createStore } from "redux";
import { currencyReducer } from './currencyReducer';

const reducers = combineReducers({
    currency: currencyReducer,
});

//global state typization
export type IGlobalState = ReturnType<typeof reducers>;

export const store = createStore(reducers);