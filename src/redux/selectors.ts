import {IGlobalState} from "./state";

//word IRootState is reserved for redux and this way we make this state inherit global state
//interface IRootState extends IGlobalState {}

//when using selectors we can use medium functions to make component get filtered or etc properties of state
//since like few months ago we can use global state type without IRootState
export const selectCurrencies = (state: IGlobalState) => state.currency.currencies;
export const selectCurrentCurrency = (state: IGlobalState) => state.currency.currentCurrency;
export const selectIsBuying = (state: IGlobalState) => state.currency.isBuying;
export const selectAmountOfBYN = (state: IGlobalState) => state.currency.amountOfBYN;
export const selectAmountOfCurrency = (state: IGlobalState) => state.currency.amountOfCurrency;

//or we can take all state
export const selectEntireState = (state: IGlobalState) => state.currency