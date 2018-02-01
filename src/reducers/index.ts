import { combineReducers } from 'redux';
import PricesReducer from './reducer_prices';

const rootReducer = combineReducers({
    // all dashboard info
    app: PricesReducer
});

export { IPriceData, IExchange } from './reducer_prices';
export default rootReducer
