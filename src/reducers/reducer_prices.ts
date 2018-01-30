import { IAction, ADD_TRANSACTION } from '../actions';

const INITIAL_STATE = {
    transactions: Object
};

// Single function for actual reducer w/ a swtich statement to catch different
// actions coming through the reducer. Each switch statement returns a new state
export default function(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case ADD_TRANSACTION:
            // const transactions = state.transactions.concat(action.payload);
            return {...state};

        default:
            return state;
    }
}
