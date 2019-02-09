var $mod$439 = core.VW.Ecma2015.Utils.module(require('../moment'));
var numbersNouns = 'pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');
function translateFuture(output) {
    var time = output;
    time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'leS' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'waQ' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'nem' : time + ' pIq';
    return time;
}
function translatePast(output) {
    var time = output;
    time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'Hu\u2019' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'wen' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'ben' : time + ' ret';
    return time;
}
function translate(number, withoutSuffix, string, isFuture) {
    var numberNoun = numberAsNoun(number);
    switch (string) {
    case 'mm':
        return numberNoun + ' tup';
    case 'hh':
        return numberNoun + ' rep';
    case 'dd':
        return numberNoun + ' jaj';
    case 'MM':
        return numberNoun + ' jar';
    case 'yy':
        return numberNoun + ' DIS';
    }
}
function numberAsNoun(number) {
    var hundred = Math.floor(number % 1000 / 100), ten = Math.floor(number % 100 / 10), one = number % 10, word = '';
    if (hundred > 0) {
        word += numbersNouns[hundred] + 'vatlh';
    }
    if (ten > 0) {
        word += (word !== '' ? ' ' : '') + numbersNouns[ten] + 'maH';
    }
    if (one > 0) {
        word += (word !== '' ? ' ' : '') + numbersNouns[one];
    }
    return word === '' ? 'pagh' : word;
}
exports.default = $mod$439.default.defineLocale('tlh', {
    months: 'tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019'.split('_'),
    monthsShort: 'jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019'.split('_'),
    monthsParseExact: true,
    weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[DaHjaj] LT',
        nextDay: '[wa\u2019leS] LT',
        nextWeek: 'LLL',
        lastDay: '[wa\u2019Hu\u2019] LT',
        lastWeek: 'LLL',
        sameElse: 'L'
    },
    relativeTime: {
        future: translateFuture,
        past: translatePast,
        s: 'puS lup',
        m: 'wa\u2019 tup',
        mm: translate,
        h: 'wa\u2019 rep',
        hh: translate,
        d: 'wa\u2019 jaj',
        dd: translate,
        M: 'wa\u2019 jar',
        MM: translate,
        y: 'wa\u2019 DIS',
        yy: translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4
    }
});