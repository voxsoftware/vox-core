var $mod$334 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$335 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$336 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$337 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$338 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$339 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$340 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$341 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$335.addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});
$mod$335.addFormatToken(0, [
    'YY',
    2
], 0, function () {
    return this.year() % 100;
});
$mod$335.addFormatToken(0, [
    'YYYY',
    4
], 0, 'year');
$mod$335.addFormatToken(0, [
    'YYYYY',
    5
], 0, 'year');
$mod$335.addFormatToken(0, [
    'YYYYYY',
    6,
    true
], 0, 'year');
$mod$336.addUnitAlias('year', 'y');
$mod$337.addRegexToken('Y', $mod$337.matchSigned);
$mod$337.addRegexToken('YY', $mod$337.match1to2, $mod$337.match2);
$mod$337.addRegexToken('YYYY', $mod$337.match1to4, $mod$337.match4);
$mod$337.addRegexToken('YYYYY', $mod$337.match1to6, $mod$337.match6);
$mod$337.addRegexToken('YYYYYY', $mod$337.match1to6, $mod$337.match6);
$mod$338.addParseToken([
    'YYYYY',
    'YYYYYY'
], $mod$340.YEAR);
$mod$338.addParseToken('YYYY', function (input, array) {
    array[$mod$340.YEAR] = input.length === 2 ? $mod$339.hooks.parseTwoDigitYear(input) : $mod$341.default(input);
});
$mod$338.addParseToken('YY', function (input, array) {
    array[$mod$340.YEAR] = $mod$339.hooks.parseTwoDigitYear(input);
});
$mod$338.addParseToken('Y', function (input, array) {
    array[$mod$340.YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
exports.daysInYear = daysInYear;
function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
$mod$339.hooks.parseTwoDigitYear = function (input) {
    return $mod$341.default(input) + ($mod$341.default(input) > 68 ? 1900 : 2000);
};
var getSetYear = $mod$334.makeGetSet('FullYear', true);
exports.getSetYear = getSetYear;
function getIsLeapYear() {
    return isLeapYear(this.year());
}
exports.getIsLeapYear = getIsLeapYear;