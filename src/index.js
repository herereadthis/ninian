const ColorShift = require('./classes/color-shift');
const HitCounter = require('./classes/hit-counter');
const ImageSelector = require('./classes/image-selector');
const RileyFuArt = require('./classes/riley-fu-art');
const SimpleDateTime = require('./classes/simple-date-time');

const HomepageConstants = require('./constants/homepage-constants');

const ParallaxScroll = require('./utils/parallax-scroll');
const StorageUtils = require('./utils/storage-utils');

const {
    BANNER_IMAGE_PATH,
    NINETIES_IMG
} = HomepageConstants;
const {
    getHitCounterWidth,
    makeNumbers,
    getHitCounterStorageValidity,
    resetHitCounterParamsStorage
} = HitCounter;
const {clearStorageLink} = StorageUtils;
const {
    moveBackground,
    killScrollListener
} = ParallaxScroll;

// import './app.less';
const CSS = require('./app.less');

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

