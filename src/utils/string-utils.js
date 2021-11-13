const parseJsonOrReturnString = (str) => {
    let result;
    try {
        result = JSON.parse(str);
    } catch (e) {
        if (e instanceof SyntaxError) {
            result = str;
        } else {
            result = e;
        }
    }
    return result;
};


const leadDecimal = (num, places = 2) => {
    let zeroes = '';
    let newNum = num.toString();
    let _t = 0;

    places = places - newNum.length;

    while (_t < places) {
        newNum = `0${newNum}`;
        _t = _t + 1;
    }
    return newNum;
};

module.exports = {
    parseJsonOrReturnString,
    leadDecimal
};
