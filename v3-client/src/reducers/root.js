import {combineReducers} from "redux";
import authReducer from "./authReducer";
import {routerReducer} from "react-router-redux";
import {idbReducer} from "./idbReducer";
import refreshTokenReducer from "./refreshTokenReducer";
import membershipsReducer from "./membershipsReducer";
import runtimesReducer from "./runtimesReducer";


let reducer = combineReducers({
    idb: idbReducer,
    routing: routerReducer,
    auth: authReducer,
    refreshToken: refreshTokenReducer,
    memberships: membershipsReducer,
    runtimes: runtimesReducer,
});

export default reducer;