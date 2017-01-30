import axios from "axios";
import {GET_MEMBERSHIPS} from "../common/endpoints";


export const GET_MEMBERSHIPS_START = "GET_MEMBERSHIPS_START";
export const GET_MEMBERSHIPS_SUCCESS = "GET_MEMBERSHIPS_SUCCESS";
export const GET_MEMBERSHIPS_ERROR = "GET_MEMBERSHIPS_ERROR";

export default function getMemberships(token) {
    return (dispatch) => {
        dispatch(getMembershipsStart());

        axios.get(GET_MEMBERSHIPS, {
            headers: {"Authorization": "Bearer " + token}
        })
            .then((response) => {
                console.log(response);
                switch (response.status) {
                    case 200:
                        dispatch(getMembershipsSuccess(response.data));
                        break;
                    default:
                        dispatch(getMembershipsError(response.data));
                }
            })
            .catch((err) => {
                // Can't send err, cause some parts of it doesn't get serialised
                // So send err.response
                dispatch(getMembershipsError({...err.response}));
            })
    }
}

function getMembershipsStart() {
    return {
        type: GET_MEMBERSHIPS_START
    };
}

function getMembershipsSuccess(data) {
    return {
        type: GET_MEMBERSHIPS_SUCCESS,
        payload: data
    };
}

function getMembershipsError(error) {
    return {
        type: GET_MEMBERSHIPS_ERROR,
        payload: error
    };
}