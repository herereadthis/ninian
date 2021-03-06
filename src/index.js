import './app.less';

import {
    BANNER_IMAGE_PATH,
    NINETIES_IMG
} from './constants/homepage-constants';

import ColorShift from './classes/color-shift';
import ImageSelector from './classes/image-selector';
import RileyFuArt from './classes/riley-fu-art';
import SimpleDateTime from './classes/simple-date-time';

import {
    getHitCounterWidth,
    makeNumbers,
    getHitCounterStorageValidity,
    resetHitCounterParamsStorage
} from './classes/hit-counter';



import {
    clearStorageLink
} from './utils/storage-utils';

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
const colorShift1 = new ColorShift(colorShiftElement1);
colorShift1.makeLetters();

// load a random banner image
const ninetiesImage = new ImageSelector(BANNER_IMAGE_PATH, NINETIES_IMG.DATA_KEY, NINETIES_IMG.HISTORY_KEY);
const bannerImageLink = document.getElementById('banner-image-link');
const bannerImage = document.getElementById('banner-image');
ninetiesImage.setTitle(bannerImageLink);
ninetiesImage.setSrc(bannerImage);

bannerImageLink.addEventListener('click', function(event) {
    event.preventDefault();
    ninetiesImage.set90sImage();
    ninetiesImage.setTitle(bannerImageLink);
    ninetiesImage.setSrc(bannerImage);
})

// set the timestamp of last updated
let lastUpdatedElement = document.getElementById('last-updated');
let lastUpdatedDateTime = new SimpleDateTime(new Date(LAST_UPDATED));
lastUpdatedElement.setAttribute('datetime', lastUpdatedDateTime.getFormattedDate());
lastUpdatedElement.textContent = lastUpdatedDateTime.getFormattedDate('wwww d MMMM, yyyy');

// create the hit counter
const hitCounterStorageValid = getHitCounterStorageValidity();
if (!hitCounterStorageValid) {
    resetHitCounterParamsStorage();
}
const hitCounterElement = document.getElementById('hit-counter-container');
const hitCounterFigures = hitCounterElement.dataset.figures;
const hitCounterCount = hitCounterElement.dataset.count;
hitCounterElement.style.width = getHitCounterWidth(hitCounterFigures);
makeNumbers(hitCounterElement, hitCounterCount, hitCounterFigures, hitCounterStorageValid);

// riley art
const rileyFuElement = document.getElementById('riley_fu');
const rileyFu = new RileyFuArt(rileyFuElement);

// clear local storage
const clearStorageElement = document.getElementById('clear-local-storage');
console.log(clearStorageElement.textContent);
clearStorageLink(clearStorageElement);

// color shift depression popup
const colorShiftElement2 = document.getElementById('color-shift-title-2');
const colorShift2 = new ColorShift(colorShiftElement2);
colorShift2.makeLetters();

