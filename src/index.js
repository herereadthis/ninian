import './app.less';
import {BANNER_IMAGE_PATH, NINETIES_IMG, APP_CACHE, NINETIES_IMAGES_DATA} from './constants/homepage-constants';
import {getRandomInteger} from './utils/math-utils';
import {
    LocalStorageMethods,
    resetCacheAge,
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

import RileyFuArt from './utils/riley-fu-art';

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
const bannerImage = document.getElementById('banner-image');
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
RileyFuArt.setCanvas();
let backgroundPosition = RileyFuArt.setBackgroundPosition();
let backgroundImage = RileyFuArt.getCanvas();
let rileyFuElement = document.getElementById('riley_fu');

rileyFuElement.style.backgroundPosition = backgroundPosition;
rileyFuElement.style.backgroundImage = 'url(' + backgroundImage + ')';

window.addEventListener('resize', function () {
    backgroundPosition = RileyFuArt.setBackgroundPosition();
    rileyFuElement.style.backgroundPosition = backgroundPosition;
}, true);

