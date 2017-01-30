import axios from "axios";
import {GET_RUNTIMES} from "../common/endpoints";


export const GET_RUNTIMES_START = "GET_RUNTIMES_START";
export const GET_RUNTIMES_SUCCESS = "GET_RUNTIMES_SUCCESS";
export const GET_RUNTIMES_ERROR = "GET_RUNTIMES_ERROR";

export default function getRuntimes(token, runtimeLockerUuid) {

    return (dispatch) => {
        dispatch(getRuntimesStart());

        axios.get(`${GET_RUNTIMES}${runtimeLockerUuid}/runtimes/`, {
            headers: {"Authorization": "Bearer " + token}
        })
            .then((response) => {
                console.log(response);
                switch (response.status) {
                    case 200:
                        dispatch(getRuntimesSuccess(response.data));
                        break;
                    default:
                        dispatch(getRuntimesError(response.data));
                }
            })
            .catch((err) => {
                // Can't send err, cause some parts of it doesn't get serialised
                // So send err.response
                dispatch(getRuntimesError({...err.response}));
            })
    }
}

function getRuntimesStart() {
    return {
        type: GET_RUNTIMES_START
    };
}

function getRuntimesSuccess(data) {
    return {
        type: GET_RUNTIMES_SUCCESS,
        payload: data
    };
}

function getRuntimesError(error) {
    return {
        type: GET_RUNTIMES_ERROR,
        payload: error
    };
}