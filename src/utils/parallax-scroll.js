import _ from 'lodash';

export const getBgPosition = (bgStyle) => {
    var bgPositions, _i;
    bgPositions = bgStyle.split(' ');

    // you can state background position as one value that doubles for x/y.
    // if so, make both values equal.
    if (bgPositions.length === 1) {
        bgPositions[1] = bgPositions[0];
    }

    // it should grab top|center|etc as percentages, but we'll force it.
    return bgPositions.map((bgPosition) => {
        let result = bgPosition;

        if (bgPosition === 'center') {
            result = '50%';
        } else if (bgPosition === 'top' || bgPosition === 'left') {
            result = '0%';
        } else if (bgPosition === 'bottom' || bgPosition === 'right') {
            result = '100%';
        } else if (/%/.test(bgPosition) && parseInt(bgPosition, 10) === 0) {
            result = 0; 
        }

        return result;
    });
};

export const setBackground = (elements) => {
    const dScroll = document.documentElement.scrollTop;
    const wHeight = window.innerHeight;

    elements.forEach((element) => {
        // logic:
        // 1. the top edge of the element is inside the window during
        // scrolling, or 2. the bottom edge of the element has not been
        // exceeded by scrolling
        let {offsetTop, domHeight} = element;
        if (dScroll + wHeight > offsetTop && offsetTop + domHeight > dScroll) {
            // scroll speed is a percentage of the actual scrolling
            let scrollSpeed = element.parallaxSpeed / 100;
            // y-position of background position
            let yPosition = -1 * Math.round(dScroll * scrollSpeed);
            // combine exising x-position and y-position of bg-position
            let newBgPosition = `${element.bgX} ${yPosition}px`;

            element.node.style.backgroundPosition = newBgPosition;
        }
    });
};

export const moveBackground = (parallaxEl) => {
    var getParallaxSpeed, parallaxRef, bgPosition, _l, bgStyle = [];

    let elements = [];

    [...parallaxEl].forEach((element, key) => {
        getParallaxSpeed = 0;
        parallaxRef = element.dataset.parallaxSpeed;

        if (!_.isNil(parallaxRef) && !_.isNaN(parallaxRef)) {
            getParallaxSpeed = parseInt(parallaxRef, 10);
        }

        bgStyle.push(getComputedStyle(element)['background-position']);
        bgPosition = getBgPosition(bgStyle[key]);

        elements.push({
            node: element,
            parallaxSpeed: getParallaxSpeed,
            domHeight: element.offsetHeight,
            offsetTop: Math.round(
                element.getBoundingClientRect().top +
                document.body.scrollTop),
            bgX: bgPosition[0],
            bgY: bgPosition[1]
        });
    });
    window.addEventListener('scroll', setBackground.bind(null, elements), true);
};

export const killScrollListener = () => {
    window.removeEventListener('scroll', setBackground, true);
};