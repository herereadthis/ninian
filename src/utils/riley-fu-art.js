import _ from 'lodash';

import {
    LocalStorageMethods,
    getCacheValidity,
    resetCacheAge
} from './storage-utils';

const rileyColors = {
    b1: '#0090D9', b2: '#388AED', b3: '#008DDB', b4: '#068ECA', b5: '#0097DF',
    b6: '#0093DE', b7: '#3694ED', b8: '#4192F0', b9: '#009AE5', b0: '#2799F3',
    p1: '#D3707E', p2: '#CD6472', p3: '#D46773',
    k1: '#202B3D', k2: '#182A46',
    w1: '#E2EBF7', w2: '#EFF2F6',
    y1: '#D4A934', y2: '#CFA632', y3: '#D8AD34'
};

const rileyColumns = [
    'b0', 'b9', 'b8', 'y1', 'b8', 'p1', 'k2', 'b8', 'p3', 'b5', 'b7', 'y3',
    'b5', 'w1', 'b5', 'b8', 'p1', 'b8', 'y3', 'b9', 'y3', 'k1', 'p3', 'b8',
    'y3', 'b5', 'y3', 'w1', 'b6', 'y1', 'b5', 'p3', 'y1', 'b2', 'y1', 'k1',
    'b7', 'p3', 'w1', 'y3', 'b6', 'y3', 'k2', 'b6', 'p3', 'b2', 'y1', 'w1',
    'b6', 'y3', 'b6', 'b2', 'y1', 'b2', 'k1', 'p2', 'b2', 'y1', 'b2', 'y1',
    'w1', 'b2', 'y1', 'b2', 'p2', 'b6', 'k2', 'b2', 'y1', 'b6', 'p2', 'b1',
    'b2', 'w1', 'b3', 'p2', 'b3', 'y1', 'b2', 'k2', 'p3', 'b5', 'p2', 'w1',
    'b2', 'y1', 'k2', 'b4', 'y1', 'b3', 'y1', 'b2', 'p2', 'b1', 'w1', 'p2',
    'b2', 'p2', 'b4', 'y1', 'k1', 'p2', 'b3', 'p2', 'b3', 'y1', 'b2', 'p1',
    'b1'
];

const breakpoints = [768, 1024, 1280];
const mediaQueries = [768, 960, 1152];

const colWidth = 8;
const colHeight = 8;

const storeRileyShape = 'rileyRect';

export default class RileyFuArt {

    // will put in local storage the background image as Canvas, if either the
    // local storage does not exist or the cache has expired.
    static setCanvas() {
        let cacheValid = getCacheValidity();
        let storedCanvas = LocalStorageMethods.get(storeRileyShape);
        let colLength = rileyColumns.length;

        if (_.isNil(storedCanvas) || !cacheValid) {
            let canvas = document.createElement('canvas');
            canvas.width = colWidth * colLength;
            canvas.height = colHeight;
            let context = canvas.getContext('2d');

            rileyColumns.forEach((column, key) => {
                let colIndex = colLength - key - 1;
                let getColor = rileyColors[column];
                context.fillStyle = getColor;
                context.fillRect(key * colWidth, 0, colWidth, colWidth);
            });

            LocalStorageMethods.set(storeRileyShape, JSON.stringify(canvas.toDataURL('image/png')));
            resetCacheAge();
        }
    };

    static getCanvas() {
        return LocalStorageMethods.get(storeRileyShape);
    };

    // determines the position of the background image.
    static setBackgroundPosition() {
        let bgX;
        let bgPos;

        // this one is inaccurate as it measures the width of the browser with
        // the scrollbar
        //windowWidth = window.innerWidth;
        let windowWidth = document.body.clientWidth;
        let bgWidth = rileyColumns.length * colWidth * -1;

        if ( windowWidth < breakpoints[0]) {
            bgX = bgWidth + (11 / 12) * windowWidth;
        } else if (windowWidth < breakpoints[1]) {
            bgX = bgWidth + ((windowWidth - mediaQueries[0]) / 2) + ((1 / 6) *
                mediaQueries[0]);
        } else if (windowWidth < breakpoints[2]) {
            bgX = bgWidth + ((windowWidth - mediaQueries[1]) / 2) + ((1 / 6) *
                mediaQueries[1]);
        } else {
            bgX = bgWidth + ((windowWidth - mediaQueries[2]) / 2) + ((1 / 6) *
                mediaQueries[2]);
        }
        bgX = (Math.round(bgX) / 10).toString();
        bgPos = bgX + 'rem 0';

        return bgPos;
    };
}