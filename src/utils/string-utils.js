export const parseJsonOrReturnString = (str) => {
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
