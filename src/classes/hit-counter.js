import _ from '../utils/lodash-utils';

import {
    colorOn,
    colorOff,
    numWidth,
    numHeight,
    hitCounterParamsKey,
    hitCounterDigitStoragePrefix,
    lcd
} from '../constants/hit-counter-constants';

import {
    LocalStorageMethods
} from '../utils/storage-utils';

const hitCounterParams = [
    colorOff,
    colorOn,
    numHeight,
    numWidth
];

// draws a polygon, given the context, the array of coordinates, and color
const polyDraw = (context, polyArray, color) => {
    context.beginPath();
    context.moveTo(polyArray[0], polyArray[1]);
    for (let coords = 2; coords < polyArray.length - 1; coords = coords + 2) {
        context.lineTo(polyArray[coords], polyArray[coords + 1]);
    }
    context.closePath();
    context.fillStyle = color;
    context.fill();
};

const makeCanvasBG = (digit, hitCounterValidity) => {
    const storedHitDigit = `${hitCounterDigitStoragePrefix}${digit}`;
    const lsHitDigit = LocalStorageMethods.get(storedHitDigit);
    let result;

    // if params are no longer valid, or if the digit has not been drawn,
    // then draw the digit.
    if (_.isNil(lsHitDigit) || !hitCounterValidity) {
        let canvas = document.createElement('canvas');
        canvas.width = numWidth;
        canvas.height = numHeight;

        lcd.forEach((barDraw) => {
            // determine if bar is 'on' or 'off' color for that specific digit
            let cMatch = colorOn;
            if (barDraw.cMatch.indexOf(digit) === -1) {
                cMatch = colorOff;
            }

            // create context for canvas for the specific bar
            let context = canvas.getContext('2d');

            // draw the bar
            polyDraw(context, barDraw.poly, cMatch);
        });

        result = `url(${canvas.toDataURL('image/png')})`;

        LocalStorageMethods.set(storedHitDigit, result);
    } else {
        // Otherwise, draw the digit from what is held in local storage.
        result = lsHitDigit;
    }
    return result;
};

export const getHitCounterWidth = (figures) => {
    var minWidth = 0.4 + 2.2 * figures;
    minWidth = parseFloat(minWidth.toPrecision(12));

    return `${minWidth}rem`;
};

export const makeNumbers = (element, pageHits, figures, hitCounterValidity) => {
    // create an array out of the page hits, each item is a number
    let numArray = pageHits.toString().split('');

    numArray = numArray.map((item) => {
        return parseInt(item, 10);
    });

    // add enough decimal-leading zeros to array so that array is the size
    // of figures
    // let addZeros = figures - numArray.length;
    while (numArray.length < figures) {
        numArray.unshift(0);
    }

    numArray.forEach((digit) => {
        let node = document.createElement('div');
        node.style.backgroundImage = makeCanvasBG(digit, hitCounterValidity);
        element.appendChild(node);
    });
};

export const getHitCounterStorageValidity = () => {
    let result = true;
    let storedHitCounterParams = LocalStorageMethods.get(hitCounterParamsKey);

    // storing the images for the hit counter are based off params.
    // if params do not exist, or new params are different than old ones,
    // then force a new canvas draw.
    if (_.isNil(storedHitCounterParams) || !_.isEqual(storedHitCounterParams, hitCounterParams)) {
        result = false;
    }
    return result;
};

export const resetHitCounterParamsStorage = () => {
    LocalStorageMethods.set(hitCounterParamsKey, JSON.stringify(hitCounterParams));
};
