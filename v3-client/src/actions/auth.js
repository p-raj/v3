import axios from "axios";
import * as URL from "../common/endpoints";

export const REQUEST_AUTH_START = "REQUEST_AUTH_START";
export const REQUEST_AUTH_SUCCESS = "REQUEST_AUTH_SUCCESS";
export const REQUEST_AUTH_ERROR = "REQUEST_AUTH_ERROR";


export default function auth(username, password) {
    let requestBody = {
        username,
        password
    };

    return (dispatch) => {
        dispatch(authStart());

        axios.post(URL.LOGIN, requestBody)
            .then((response) => {
                switch (response.status) {
                    case  200:
                        dispatch(authSuccess(response.data));
                        break;
                    default:
                        dispatch(authError(response.data))
                }
            })
            .catch((err) => {
                dispatch(authError(err))
            })
    }
}

function authStart() {
    return {
        type: REQUEST_AUTH_START
    };
}

function authSuccess(data) {
    return {
        type: REQUEST_AUTH_SUCCESS,
        payload: data
    };
}

function authError(error) {
    return {
        type: REQUEST_AUTH_ERROR,
        payload: error
    };
}