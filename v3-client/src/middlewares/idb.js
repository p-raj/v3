import idb from "idb";
import {Log} from "../logger/Logger";


export const DB_NAME = 'veris_client';
export const OBJ_STORE = 'veris-redux';
export const KEY = 'redux';

const dbPromise = idb.open(DB_NAME, 1, upgradeDB => {
    upgradeDB.createObjectStore(OBJ_STORE);
});

const idbMiddleware = (store) => (next) => (action) => {
    dbPromise.then(db => {
        const tx = db.transaction(OBJ_STORE, 'readwrite');

        // Start writing to IDB only if we have loaded existing data from it.
        if (store.getState().idb === true) {
            Log.i("IDB middle-ware wrote: ", store.getState());
            tx.objectStore(OBJ_STORE).put({...store.getState()}, KEY);
        }

        return tx.complete;
    });

    next(action);
};

export default idbMiddleware;
