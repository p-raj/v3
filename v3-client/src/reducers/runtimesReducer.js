import * as TYPE from "../actions/getRuntimes";
import {FAILED, START, SUCCESS} from "../common/constants";


export default function runtimesReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.GET_RUNTIMES_START:
            return {
                ...state,
                ...action.payload,
                status: START
            };
        case TYPE.GET_RUNTIMES_SUCCESS:
            return {
                ...state,
                ...action.payload,
                status: SUCCESS
            };
        case TYPE.GET_RUNTIMES_ERROR:
            return {
                ...state,
                ...action.payload.data,
                statusText: action.payload.statusText,
                statusCode: action.payload.status,
                status: FAILED
            };
        default:
            return state;
    }
}
