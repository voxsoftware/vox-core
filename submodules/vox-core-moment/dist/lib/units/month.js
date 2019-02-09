var $mod$254 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$255 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$256 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$257 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$258 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$259 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$260 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$261 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$262 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$263 = core.VW.Ecma2015.Utils.module(require('../utils/is-array'));
var $mod$264 = core.VW.Ecma2015.Utils.module(require('../utils/index-of'));
var $mod$265 = core.VW.Ecma2015.Utils.module(require('../create/utc'));
var $mod$266 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
exports.daysInMonth = daysInMonth;
$mod$256.addFormatToken('M', [
    'MM',
    2
], 'Mo', function () {
    return this.month() + 1;
});
$mod$256.addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});
$mod$256.addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});
$mod$257.addUnitAlias('month', 'M');
$mod$258.addRegexToken('M', $mod$258.match1to2);
$mod$258.addRegexToken('MM', $mod$258.match1to2, $mod$258.match2);
$mod$258.addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
$mod$258.addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});
$mod$259.addParseToken([
    'M',
    'MM'
], function (input, array) {
    array[$mod$261.MONTH] = $mod$262.default(input) - 1;
});
$mod$259.addParseToken([
    'MMM',
    'MMMM'
], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    if (month != null) {
        array[$mod$261.MONTH] = month;
    } else {
        $mod$266.default(config).invalidMonth = input;
    }
});
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
exports.defaultLocaleMonths = defaultLocaleMonths;
function localeMonths(m, format) {
    return $mod$263.default(this._months) ? this._months[m.month()] : this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}
exports.localeMonths = localeMonths;
var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
exports.defaultLocaleMonthsShort = defaultLocaleMonthsShort;
function localeMonthsShort(m, format) {
    return $mod$263.default(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}
exports.localeMonthsShort = localeMonthsShort;
function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = $mod$265.createUTC([
                2000,
                i
            ]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }
    if (strict) {
        if (format === 'MMM') {
            ii = $mod$264.default.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = $mod$264.default.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = $mod$264.default.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$264.default.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = $mod$264.default.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = $mod$264.default.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}
function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;
    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }
    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }
    for (i = 0; i < 12; i++) {
        mom = $mod$265.createUTC([
            2000,
            i
        ]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}
exports.localeMonthsParse = localeMonthsParse;
function setMonth(mom, value) {
    var dayOfMonth;
    if (!mom.isValid()) {
        return mom;
    }
    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = $mod$262.default(value);
        } else {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== 'number') {
                return mom;
            }
        }
    }
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}
exports.setMonth = setMonth;
function getSetMonth(value) {
    if (value != null) {
        setMonth(this, value);
        $mod$260.hooks.updateOffset(this, true);
        return this;
    } else {
        return $mod$254.get(this, 'Month');
    }
}
exports.getSetMonth = getSetMonth;
function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
}
exports.getDaysInMonth = getDaysInMonth;
var defaultMonthsShortRegex = $mod$258.matchWord;
exports.defaultMonthsShortRegex = defaultMonthsShortRegex;
function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
        if (!$mod$255.default(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}
exports.monthsShortRegex = monthsShortRegex;
var defaultMonthsRegex = $mod$258.matchWord;
exports.defaultMonthsRegex = defaultMonthsRegex;
function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
        if (!$mod$255.default(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
}
exports.monthsRegex = monthsRegex;
function computeMonthsParse() {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }
    var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
    for (i = 0; i < 12; i++) {
        mom = $mod$265.createUTC([
            2000,
            i
        ]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = $mod$258.regexEscape(shortPieces[i]);
        longPieces[i] = $mod$258.regexEscape(longPieces[i]);
        mixedPieces[i] = $mod$258.regexEscape(mixedPieces[i]);
    }
    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}