import { combineReducers } from 'redux';
import PricesReducer from './reducer_prices';

const rootReducer = combineReducers({
    // all dashboard info
    dash: PricesReducer
});

export default rootReducer;
