import _ from 'lodash';

import {
    getRandomInteger
} from '../utils/math-utils';

import {
    NINETIES_IMAGES_DATA
} from '../constants/homepage-constants';

import {
    LocalStorageMethods,
    getCacheValidity,
    resetCacheAge
} from '../utils/storage-utils';

import {
    parseJsonOrReturnString
} from '../utils/string-utils';

const get90sImageDataFromCache = function() {
    let cacheValid = getCacheValidity();
    let imageData = parseJsonOrReturnString(LocalStorageMethods.get(this.dataKey));

    if (!cacheValid || !_.isArray(imageData)) {
        console.log('update cache!');
        imageData = NINETIES_IMAGES_DATA;
        resetCacheAge();
        LocalStorageMethods.set(this.dataKey, JSON.stringify(imageData));
    }

    return imageData;
};

const get90sImageHistory = function() {
    let history = LocalStorageMethods.get(this.historyKey);

    if (_.isEmpty(history)) {
        history = [];
    }

    return history;
};

const append90sImageHistory = function(index) {
    let history = this::get90sImageHistory();
    history.push(index);

    LocalStorageMethods.set(this.historyKey, JSON.stringify(history));
};

const reset90sImageHistory = function() {
    LocalStorageMethods.set(this.historyKey, []);
};

export default class ImageSelector {

    constructor(pathUrl, dataKey, historyKey) {
        this.pathUrl = pathUrl;
        this.dataKey = dataKey;
        this.historyKey = historyKey;
        this.set90sImage();
    }

    set90sImage() {
        const imageData = this::get90sImageDataFromCache();
        const imageCount = imageData.length;

        const history = this::get90sImageHistory();
        let index = getRandomInteger(imageCount);

        if (history.length === imageCount) {
            this::reset90sImageHistory();
        } else {
            while (history.indexOf(index) !== -1) {
                index = getRandomInteger(imageCount);
            }
            this::append90sImageHistory(index);
        }

        const selectedImage = imageData[index];

        this.image = selectedImage.img;
        this.thumbnail = selectedImage.thumb;
        this.description = selectedImage.description;
    };

    get imageUrl() {
        return `${this.pathUrl}${this.image}`;
    }

    get thumbnailUrl() {
        return `${this.pathUrl}${this.thumbnail}`;
    }
}
