const _ = require('../utils/lodash-utils');
const MathUtils = require('../utils/math-utils');
const StorageUtils = require('../utils/storage-utils');
const StringUtils = require('../utils/string-utils');
const HomepageConstants = require('../constants/homepage-constants');

const {getRandomInteger} = MathUtils;
const {NINETIES_IMAGES_DATA} = HomepageConstants;

const {
    LocalStorageMethods,
    getCacheValidity,
    resetCacheAge
} = StorageUtils;

const {parseJsonOrReturnString} = StringUtils;

class ImageSelector {
    constructor(pathUrl, dataKey, historyKey) {
        this.pathUrl = pathUrl;
        this.dataKey = dataKey;
        this.historyKey = historyKey;
        this.set90sImage();
    }

    set90sImage() {
        const imageData = this.get90sImageDataFromCache();
        const imageCount = imageData.length;

        const history = this.get90sImageHistory();
        let index = getRandomInteger(imageCount);

        if (history.length === imageCount) {
            this.reset90sImageHistory();
        } else {
            while (history.indexOf(index) !== -1) {
                index = getRandomInteger(imageCount);
            }
            this.append90sImageHistory(index);
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

    setTitle(element) {
        element.setAttribute('title', this.title);
    }

    setSrc(element) {
        element.setAttribute('src', this.thumbnailUrl);
    }

    get90sImageDataFromCache() {
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

    get90sImageHistory() {
        let history = LocalStorageMethods.get(this.historyKey);
    
        if (_.isEmpty(history)) {
            history = [];
        }
    
        return history;
    }

    reset90sImageHistory() {
        LocalStorageMethods.set(this.historyKey, []);
    }

    append90sImageHistory(index) {
        let history = this.get90sImageHistory();
        history.push(index);
    
        LocalStorageMethods.set(this.historyKey, JSON.stringify(history));
    }
}

module.exports = ImageSelector;
