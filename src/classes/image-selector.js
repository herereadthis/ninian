import axios from 'axios';
import _ from 'lodash';

import {
    getRandomInteger
} from '../utils/math-utils';

import {
    ASSETS_DATA_PATH
} from '../constants/app-constants';

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

const get90sImageDataFromCache = async function() {
    let cacheValid = getCacheValidity();
    let imageData = parseJsonOrReturnString(LocalStorageMethods.get(this.dataKey));

    if (!cacheValid || !_.isArray(imageData)) {
        // imageData = NINETIES_IMAGES_DATA;
        let url = `${ASSETS_DATA_PATH}banner-image.json`;
        console.log(url);
        let response;

        response = await axios.get(url);

        console.log(response.data)

        LocalStorageMethods.set(this.dataKey, JSON.stringify(response.data));

        // await axios.get(url)
        //     .then((response) => {
        //         // store the 90s image data

        //         console.log(response.data)

        //         LocalStorageMethods.set(this.dataKey, JSON.stringify(response.data));
        //     }
        // );

        // resetCacheAge();
    }

    console.log(imageData)

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
        console.log(dataKey)
        this.pathUrl = pathUrl;
        this.dataKey = dataKey;
        this.historyKey = historyKey;
    }

    async set90sImage() {
        const imageData = await this::get90sImageDataFromCache();
        console.log(imageData)
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
        this.title = selectedImage.title;
        this.description = selectedImage.description;
    };

    get imageUrl() {
        return `${this.pathUrl}${this.image}`;
    }

    get thumbnailUrl() {
        return `${this.pathUrl}${this.thumbnail}`;
    }
}
