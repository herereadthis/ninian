import './app.less';
import {APP_CACHE} from './constants/app-constants';
import {
    BANNER_IMAGE_PATH,
    NINETIES_IMG
} from './constants/homepage-constants';
import {getRandomInteger} from './utils/math-utils';
import {
    LocalStorageMethods,
    getCacheValidity
} from './utils/storage-utils';
import {parseJsonOrReturnString} from './utils/string-utils';
import _ from 'lodash';

import ColorShift from './classes/color-shift';
import ImageSelector from './classes/image-selector';

import {setTimestamp} from './utils/dom-utils';

import {
    getHitCounterWidth,
    makeNumbers,
    getHitCounterStorageValidity,
    resetHitCounterParamsStorage
} from './classes/hit-counter';

import RileyFuArt from './classes/riley-fu-art';

import {
    moveBackground,
    killScrollListener
} from './utils/parallax-scroll';

// parallax scroll
const parallaxScroll = document.getElementsByClassName('parallax_scroll');
moveBackground(parallaxScroll);
window.addEventListener('resize', function () {
    killScrollListener();
    moveBackground(parallaxScroll);
}, true);

// color shift the title
const colorShiftElement1 = document.getElementById('color-shift-title-1');
const colorShift1 = new ColorShift(
    colorShiftElement1.textContent,
    colorShiftElement1.dataset.colorShiftStart,
    colorShiftElement1.dataset.colorShiftEnd
);
colorShift1.makeLetters(colorShiftElement1);

// load a random banner image
const ninetiesImage = new ImageSelector(BANNER_IMAGE_PATH, NINETIES_IMG.DATA_KEY, NINETIES_IMG.HISTORY_KEY);
ninetiesImage.set90sImage();
const bannerImageLink = document.getElementById('banner-image-link');
const bannerImage = document.getElementById('banner-image');
bannerImageLink.setAttribute('title', ninetiesImage.title);
bannerImage.setAttribute('src', ninetiesImage.thumbnailUrl);

// set the timestamp of last updated
let lastUpdatedElement = document.getElementById('last-updated');
lastUpdatedElement.textContent = setTimestamp(LAST_UPDATED);

const hitCounterStorageValid = getHitCounterStorageValidity();
if (!hitCounterStorageValid) {
    resetHitCounterParamsStorage();
}

// create the hit counter
const hitCounterElement = document.getElementById('hit-counter-container');
const hitCounterFigures = hitCounterElement.dataset.figures;
const hitCounterCount = hitCounterElement.dataset.count;
hitCounterElement.style.width = getHitCounterWidth(hitCounterFigures);
makeNumbers(hitCounterElement, hitCounterCount, hitCounterFigures, hitCounterStorageValid);


// riley art
const rileyFuElement = document.getElementById('riley_fu');
const rileyFu = new RileyFuArt(rileyFuElement);

