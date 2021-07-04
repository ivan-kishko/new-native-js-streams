import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from '../../redux/currencyReducer';
import {Dispatch} from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC,
    CurrencyReducersTypes
} from '../../redux/actions';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {
    selectAmountOfBYN,
    selectAmountOfCurrency,
    selectCurrencies,
    selectCurrentCurrency,
    selectIsBuying,
    selectEntireState,
} from "../../redux/selectors";

// const CurrencyEContainer: React.FC<TProps> = props => {

// const {
//     currencies,
//     currentCurrency,
//     isBuying,
//     amountOfBYN,
//     amountOfCurrency,
//     setCurrencyAmount,
//     setAction,
//     changeCurrency,
// } = props;

// const {
//     currencies,
//     currentCurrency,
//     isBuying,
//     amountOfBYN,
//     amountOfCurrency,
//     ChangeActionAC,
//     ChangeCurrencyFieldAC,
//     ChangeCurrentCurrencyAC,
// } = props;

// const {
//     currencies,
//     currentCurrency,
//     isBuying,
//     amountOfBYN,
//     amountOfCurrency,
// } = props;

const CurrencyEContainer: React.FC = () => {

    //hook useSelector from react-redux lib
    //we can use useSelector hook to make mapStateToProps redundant as well
    //tho we need create selectors file
    // const currencies = useSelector(selectCurrencies)
    // const currentCurrency = useSelector(selectCurrentCurrency)
    // const isBuying = useSelector(selectIsBuying)
    // const amountOfBYN = useSelector(selectAmountOfBYN)
    // const amountOfCurrency = useSelector(selectAmountOfCurrency)
    //---------------------------------------------------------------------------

    //getting entire state from use selector
    const {
        currencies,
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency,
    } = useSelector(selectEntireState)

    //hook useDispatch from react-redux lib
    //since we import all action creators we can call useDispatch hook to generate dispatch
    //func right inside component and then we just calling dispatch with action creator wherever we need it
    //mapDispatchToProps is redundant because of this hook
    const dispatch = useDispatch<Dispatch<CurrencyReducersTypes>>()

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    //setCurrencyAmount(value, value);
                    //ChangeCurrencyFieldAC(value, value);
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    //setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                    //ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    //setCurrencyAmount(value, value);
                    //ChangeCurrencyFieldAC(value, value);
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    //setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                    //ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        //e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
        //e.currentTarget.dataset.action === 'buy' ? ChangeActionAC(true) : ChangeActionAC(false);
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        //e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
        //e.currentTarget.dataset.currency && ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency);
        e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

//typization through destructuring
// const mapStateToProps = ( { currency } : { currency: CurrencyState } ): CurrencyState => {
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };

// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => {
//     return {
//         setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction(isBuying: boolean) {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency(currency: string) {
//             dispatch(ChangeCurrentCurrencyAC(currency));
//         },
//     };
// };

//------------------------------------------------------
//connect uses 2 calls 1 for props and dispatches and right after goes calling a component
//but we can only call state and dispatch, then make a type of props using that var and then call
//this connector to a component, this way we dont have to manually make a type for props
//const connector = connect(mapStateToProps, mapDispatchToProps);
//------------------------------------------------------

//instead of making mapDispatchToProps func we can right away pass action creators to connect func
//this way in props instead of functions we get ACs as functions so we have to pass ACs names in props and change
//names of this functions in component
//const connector = connect(mapStateToProps, {ChangeActionAC, ChangeCurrencyFieldAC, ChangeCurrentCurrencyAC});


// const connector = connect(mapStateToProps, {});
//
// type TProps = ConnectedProps<typeof connector>;
//
// export default connector(CurrencyEContainer);

export default CurrencyEContainer;

