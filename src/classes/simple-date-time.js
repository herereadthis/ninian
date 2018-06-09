import _ from '../utils/lodash-utils';

import {leadDecimal} from '../utils/string-utils';

const DATE_TIME_STRINGS = {
    fr: {
        MMM: ['janv', 'févr', 'mars', 'avril', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
        MMMM: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        www: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        wwww: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    },
    es: {
        MMM: ['enero', 'feb', 'marzo', 'abr', 'mayo', 'jun', 'jul', 'agosto', 'set', 'oct', 'nov', 'dic'],
        MMMM: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        www: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        wwww: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    },
    ru: {
        MMM: ['ianv', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'ноябрь', 'дек'],
        MMMM: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
        www: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        wwww: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
    },
    en: {
        MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        www: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        wwww: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
};

const TEST_REGEX = /(([a-z])+|([^a-z0-9]*))/gi;
const KEY_REGEX = /^\w+$/;
const CONCAT_REGEX = /(\w)\1*/g;
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export default class SimpleDateTime {
    constructor(dateTime, locale = 'en') {
        this.locale = locale;
        this.dateTime = null;
        if (_.isString(dateTime) && (isNaN(Date.parse(dateTime)) === false || !_.isEmpty(dateTime))) {
            this.dateTime = new Date(dateTime);
        } else if (dateTime instanceof Date) {
            this.dateTime = dateTime
        }
        this.dateObj = this.makeDateObj(this.dateTime);
    }

    static getFormatArray (format) {
        let formatArray = format.match(TEST_REGEX);
        let cleanArray = [];
        let concatFormat = [];

        formatArray.forEach((item, index) => {
            if (!_.isEmpty(item)) {
                // in case DateRender is attempting to format a string like
                // yyyyMMdd or hh:mma
                concatFormat = item.match(CONCAT_REGEX);

                if (!_.isNil(concatFormat)) {
                    concatFormat.forEach(c => cleanArray.push(c));
                } else {
                    cleanArray.push(item);
                }
            }
        });
        return cleanArray;
    };

    setLocale(locale = 'en') {
        this.locale = locale;
    }

    makeDateObj(date) {
        const dateStrings = DATE_TIME_STRINGS[this.locale];
        // years
        const yyyy = date.getFullYear();
        const yy = yyyy.toString().substring(2, 4);

        // months
        const M = date.getMonth();
        const {MMM, MMMM} = dateStrings;

        // days of the week
        const w = date.getDay();
        const {www, wwww} = dateStrings;

        // date
        const d = date.getDate();

        // hours
        const H = date.getHours();
        let h = H;
        let a = 'AM';
        if (h >= 12) {
            h = h - 12;
            a = 'PM';
        }
        if (h === 0) {
            h = 12;
        }

        // minutes
        const m = date.getMinutes();
        // seconds
        const s = date.getSeconds();
        // milliseconds
        const S = date.getMilliseconds();

        return {
            yyyy,
            yy,
            M: M + 1,
            MM: leadDecimal(M + 1),
            MMM: MMM[M],
            MMMM: MMMM[M],
            w: w + 1,
            ww: leadDecimal(w + 1),
            www: www[w],
            wwww: wwww[w],
            d,
            dd: leadDecimal(d),
            H,
            HH: leadDecimal(H),
            h,
            hh: leadDecimal(h),
            a,
            m,
            mm: leadDecimal(m),
            s,
            ss: leadDecimal(s),
            S,
            SS: leadDecimal(S, 3),
            // timezone
            tz: date.getTimezoneOffset()
        };
    };

    getDateValues(dateFormat) {
        let dateValues = [];
        let _j;

        dateFormat.forEach((item) => {
            if (KEY_REGEX.test(item) && !_.isNil(this.dateObj[item])) {
                dateValues.push(this.dateObj[item]);
            } else {
                dateValues.push(item);
            }
        });
        return dateValues.join('');
    }

    getFormattedDate(format = DEFAULT_DATE_FORMAT) {
        let dateFormat = SimpleDateTime.getFormatArray(format);

        let foo = this.getDateValues(dateFormat);
        return this.getDateValues(dateFormat);
    }
}