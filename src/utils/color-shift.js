import _ from 'lodash';

const SHORTHAND_HEX_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

export default class ColorShift {

    constructor(text, colorStart, colorEnd) {
        this.text = text;
        this.colorStart = ColorShift.hexToRgb(colorStart);
        this.colorEnd = ColorShift.hexToRgb(colorEnd);
    }

    static getFullHex(hex) {
        const sh = SHORTHAND_HEX_REGEX.exec(hex);

        if (!_.isNil(sh)) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            hex = `${sh[1]}${sh[1]}${sh[2]}${sh[2]}${sh[3]}${sh[3]}`;
        }
        return hex;
    }

    // hexToRgb function taken from
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    static hexToRgb(hex) {
        hex = ColorShift.getFullHex(hex);

        let result = null;
        const hexExec = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (!_.isNil(hexExec)) {
            result = {
                r: parseInt(hexExec[1], 16),
                g: parseInt(hexExec[2], 16),
                b: parseInt(hexExec[3], 16)
            };
        }
        return result;
    }

    makeLetters(element) {
        element.textContent = '';

        const colorDiff = {
            r: this.colorEnd.r - this.colorStart.r,
            g: this.colorEnd.g - this.colorStart.g,
            b: this.colorEnd.b - this.colorStart.b
        };

        const lettersArray = this.text.split('');

        return lettersArray.forEach((letter, key) => {
            let increment = key / (lettersArray.length - 1);

            // each RGB value gets one more increment of the diff value
            let diffR = Math.round(this.colorStart.r + increment * colorDiff.r);
            let diffG = Math.round(this.colorStart.g + increment * colorDiff.g);
            let diffB = Math.round(this.colorStart.b + increment * colorDiff.b);

            let node = document.createElement('span');
            node.style.color = `rgb(${diffR},${diffG},${diffB})`;
            node.textContent = letter;

            element.appendChild(node);
        });
    }
}
