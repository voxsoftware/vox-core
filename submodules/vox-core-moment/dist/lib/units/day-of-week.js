var $mod$215 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$216 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$217 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$218 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$219 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$220 = core.VW.Ecma2015.Utils.module(require('../utils/is-array'));
var $mod$221 = core.VW.Ecma2015.Utils.module(require('../utils/index-of'));
var $mod$222 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$223 = core.VW.Ecma2015.Utils.module(require('../create/utc'));
var $mod$224 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
$mod$215.addFormatToken('d', 0, 'do', 'day');
$mod$215.addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});
$mod$215.addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});
$mod$215.addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});
$mod$215.addFormatToken('e', 0, 0, 'weekday');
$mod$215.addFormatToken('E', 0, 0, 'isoWeekday');
$mod$216.addUnitAlias('day', 'd');
$mod$216.addUnitAlias('weekday', 'e');
$mod$216.addUnitAlias('isoWeekday', 'E');
$mod$217.addRegexToken('d', $mod$217.match1to2);
$mod$217.addRegexToken('e', $mod$217.match1to2);
$mod$217.addRegexToken('E', $mod$217.match1to2);
$mod$217.addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
$mod$217.addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
$mod$217.addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});
$mod$218.addWeekParseToken([
    'dd',
    'ddd',
    'dddd'
], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    if (weekday != null) {
        week.d = weekday;
    } else {
        $mod$224.default(config).invalidWeekday = input;
    }
});
$mod$218.addWeekParseToken([
    'd',
    'e',
    'E'
], function (input, week, config, token) {
    week[token] = $mod$219.default(input);
});
function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }
    if (!isNaN(input)) {
        return parseInt(input, 10);
    }
    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }
    return null;
}
var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
exports.defaultLocaleWeekdays = defaultLocaleWeekdays;
function localeWeekdays(m, format) {
    return $mod$220.default(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}
exports.localeWeekdays = localeWeekdays;
var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
exports.defaultLocaleWeekdaysShort = defaultLocaleWeekdaysShort;
function localeWeekdaysShort(m) {
    return this._weekdaysShort[m.day()];
}
exports.localeWeekdaysShort = localeWeekdaysShort;
var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
exports.defaultLocaleWeekdaysMin = defaultLocaleWeekdaysMin;
function localeWeekdaysMin(m) {
    return this._weekdaysMin[m.day()];
}
exports.localeWeekdaysMin = localeWeekdaysMin;
function handleStrictParse(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];
        for (i = 0; i < 7; ++i) {
            mom = $mod$223.createUTC([
                2000,
                1
            ]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }
    if (strict) {
        if (format === 'dddd') {
            ii = $mod$221.default.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = $mod$221.default.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = $mod$221.default.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = $mod$221.default.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = $mod$221.default.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = $mod$221.default.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$221.default.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}
function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;
    if (this._weekdaysParseExact) {
        return handleStrictParse.call(this, weekdayName, format, strict);
    }
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }
    for (i = 0; i < 7; i++) {
        mom = $mod$223.createUTC([
            2000,
            1
        ]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}
exports.localeWeekdaysParse = localeWeekdaysParse;
function getSetDayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}
exports.getSetDayOfWeek = getSetDayOfWeek;
function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}
exports.getSetLocaleDayOfWeek = getSetLocaleDayOfWeek;
function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
}
exports.getSetISODayOfWeek = getSetISODayOfWeek;
var defaultWeekdaysRegex = $mod$217.matchWord;
exports.defaultWeekdaysRegex = defaultWeekdaysRegex;
function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!$mod$222.default(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}
exports.weekdaysRegex = weekdaysRegex;
var defaultWeekdaysShortRegex = $mod$217.matchWord;
exports.defaultWeekdaysShortRegex = defaultWeekdaysShortRegex;
function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!$mod$222.default(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}
exports.weekdaysShortRegex = weekdaysShortRegex;
var defaultWeekdaysMinRegex = $mod$217.matchWord;
exports.defaultWeekdaysMinRegex = defaultWeekdaysMinRegex;
function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
        if (!$mod$222.default(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}
exports.weekdaysMinRegex = weekdaysMinRegex;
function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }
    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        mom = $mod$223.createUTC([
            2000,
            1
        ]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = $mod$217.regexEscape(shortPieces[i]);
        longPieces[i] = $mod$217.regexEscape(longPieces[i]);
        mixedPieces[i] = $mod$217.regexEscape(mixedPieces[i]);
    }
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}