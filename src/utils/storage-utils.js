const _ = require('./lodash-utils');
const StringUtils = require('./string-utils');
const AppConstants = require('../constants/app-constants');

const {parseJsonOrReturnString} = StringUtils;
const {APP_CACHE} = AppConstants;

const LocalStorageMethods = {
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

const SessionStorageMethods = {
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

const resetCacheAge = () => {
    return LocalStorageMethods.set(APP_CACHE.AGE, new Date());
};

const getCacheValidity = () => {
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

const clearStorageLink = (domElement) => {
    domElement.addEventListener('click', function(event){
        event.preventDefault();
        localStorage.clear();
    });
};

module.exports = {
    LocalStorageMethods,
    SessionStorageMethods,
    resetCacheAge,
    getCacheValidity,
    clearStorageLink
};
