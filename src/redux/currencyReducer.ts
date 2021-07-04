import {ACTIONS_TYPE, CurrencyReducersTypes} from './actions';


export type CurrencyType = {
    currencyName: string;
    buyRate: number;
    sellRate: number;
};
export type CurrencyState = {
    currencies: Array<CurrencyType>;
    currentCurrency: string;
    isBuying: boolean;
    amountOfBYN: string;
    amountOfCurrency: string;
};

const initialState: CurrencyState = {
    currencies: [
        {
            currencyName: 'USD',
            buyRate: 2.62,
            sellRate: 2.58,
        },
        {
            currencyName: 'EUR',
            buyRate: 3.1,
            sellRate: 3.06,
        },
        {
            currencyName: 'RUR',
            buyRate: 0.0345,
            sellRate: 0.0341,
        },
    ],
    currentCurrency: 'USD',
    isBuying: true,
    amountOfBYN: '',
    amountOfCurrency: '',
};

//all logic is in container component, reducers are giving only data that have to be changed
export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE:
            return {
                ...state,
                ...action.payload,
            }
        //if code in switch case is the same we can use 2 cases 1 right after another
        case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY:
        case ACTIONS_TYPE.CHANGE_CHANGE_ACTION:
            return {
                ...state,
                ...action.payload,
                amountOfBYN: '',
                amountOfCurrency: '',
            }
        // case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         amountOfBYN: '',
        //         amountOfCurrency: '',
        //     }
        default:
            return state;
    }
};
