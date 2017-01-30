import {LOAD_REDUX_STATE} from "../actions/loadPersistantData";


export function idbReducer(state = false, action) {
    switch (action.type) {
        case LOAD_REDUX_STATE:
            return true;
        default:
            return state;
    }
}