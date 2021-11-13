const colorOn = 'rgba(0,255,0,1)';
const colorOff = 'rgba(0,255,0,0.18)';

const numWidth = 120;
const numHeight = 240;

const hitCounterParamsKey = 'hitDigitParams';
const hitCounterDigitStoragePrefix = 'hitDigit';

const lcd = [
    {
        // top horizontal bar
        key: 'tb',
        cMatch: [0, 2, 3, 5, 6, 7, 8, 9],
        poly: [18, 12, 30, 0, 90, 0, 102, 12, 90, 24, 30, 24]
    },
    {
        // middle horizontal bar
        key: 'mb',
        cMatch: [2, 3, 4, 5, 6, 8, 9],
        poly: [18, 108, 30, 96, 90, 96, 102, 108, 90, 120, 30, 120]
    },
    {
        // bottom horizontal bar
        key: 'bb',
        cMatch: [0, 2, 3, 5, 6, 8],
        poly: [18, 204, 30, 192, 90, 192, 102, 204, 90, 216, 30, 216]
    },
    {
        // top left vertical bar
        key: 'tl',
        cMatch: [0, 4, 5, 6, 8, 9],
        poly: [0, 30, 12, 18, 24, 30, 24, 90, 12, 102, 0, 90]
    },
    {
        // top right vertical bar
        key: 'tr',
        cMatch: [0, 1, 2, 3, 4, 7, 8, 9],
        poly: [96, 30, 108, 18, 120, 30, 120, 90, 108, 102, 96, 90]
    },
    {
        // bottom left vertical bar
        key: 'bl',
        cMatch: [0, 2, 6, 8],
        poly: [0, 126, 12, 114, 24, 126, 24, 186, 12, 198, 0, 186]
    },
    {
        // bottom right vertical bar
        key: 'br',
        cMatch: [0, 1, 3, 4, 5, 6, 7, 8, 9],
        poly: [96, 126, 108, 114, 120, 126, 120, 186, 108, 198, 96, 186]
    }
];

module.exports = {
    colorOn,
    colorOff,
    numWidth,
    numHeight,
    hitCounterParamsKey,
    hitCounterDigitStoragePrefix,
    lcd
}
