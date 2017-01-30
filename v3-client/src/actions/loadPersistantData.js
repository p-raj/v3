import idb from "idb";
import {DB_NAME, OBJ_STORE, KEY} from "../middlewares/idb";


export const LOAD_REDUX_STATE = 'LOAD_REDUX_DATA';

const dbPromise = idb.open(DB_NAME, 1, upgradeDB => {
    upgradeDB.createObjectStore(OBJ_STORE);
});

export default function loadPersistantData() {
    return (dispatch) => {
        dbPromise.then(db => {
            return db.transaction(OBJ_STORE)
                .objectStore(OBJ_STORE).get(KEY)
        }).then((data) => {
            dispatch({
                type: LOAD_REDUX_STATE,
                payload: data
            });
        });
    }
}

