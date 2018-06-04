import {parseJsonOrReturnString} from './string-utils'
import {APP_CACHE} from '../constants/app-constants';

export const LocalStorageMethods = {
    set: (key, value) => {
        localStorage[key] = value;
    },
    get: (item) => {
        let obj = localStorage[item];
        return parseJsonOrReturnString(obj);
    },
    remove: (key)=> {
        localStorage.removeItem(key);
    }
};

export const SessionStorageMethods = {
    set: (key, value) => {
        sessionStorage[key] = value;
    },
    get: (item) => {
        let obj = sessionStorage[item];
        return parseJsonOrReturnString(obj);
    },
    remove: (key) => {
        sessionStorage.removeItem(key);
    }
};

export const resetCacheAge = () => {
    return LocalStorageMethods.set(APP_CACHE.AGE, new Date());
};

export const getCacheValidity = () => {
    let currentTime = new Date();
    let result = true;

    let storageCacheAge = LocalStorageMethods.get(APP_CACHE.AGE);

    if (_.isNil(storageCacheAge)) {
        result = false;
    } else {
        let dateDiff = Date.parse(currentTime) - Date.parse(storageCacheAge);

        // if the time between the last cache and now is greater than the cache
        // limit or if the new cache time is now.
        if (dateDiff > APP_CACHE.LIMIT) {
            result = false;
        }
    }
    return result;
};
