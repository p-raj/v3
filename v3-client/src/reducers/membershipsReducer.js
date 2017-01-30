import * as TYPE from "../actions/getMemberships";
import {FAILED, START, SUCCESS} from "../common/constants";

export default function membershipsReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.GET_MEMBERSHIPS_START:
            return {
                ...state,
                ...action.payload,
                status: START
            };
        case TYPE.GET_MEMBERSHIPS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                status: SUCCESS
            };
        case TYPE.GET_MEMBERSHIPS_ERROR:
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
