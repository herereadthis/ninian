import moment from 'moment';

const DATE_FORMAT = 'D MMMM YYYY';

export const setTimestamp = (date, dateFormat = DATE_FORMAT) => {
    if(!(date instanceof Date)) {
        date = new Date(date);
    }
    return 123;
    return moment(date).format(dateFormat);
};
