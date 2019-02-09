var $mod$232 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$233 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$234 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$235 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$236 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$237 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$238 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$239 = core.VW.Ecma2015.Utils.module(require('../utils/zero-fill'));
var $mod$240 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
function hFormat() {
    return this.hours() % 12 || 12;
}
function kFormat() {
    return this.hours() || 24;
}
$mod$233.addFormatToken('H', [
    'HH',
    2
], 0, 'hour');
$mod$233.addFormatToken('h', [
    'hh',
    2
], 0, hFormat);
$mod$233.addFormatToken('k', [
    'kk',
    2
], 0, kFormat);
$mod$233.addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + $mod$239.default(this.minutes(), 2);
});
$mod$233.addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + $mod$239.default(this.minutes(), 2) + $mod$239.default(this.seconds(), 2);
});
$mod$233.addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + $mod$239.default(this.minutes(), 2);
});
$mod$233.addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + $mod$239.default(this.minutes(), 2) + $mod$239.default(this.seconds(), 2);
});
function meridiem(token, lowercase) {
    $mod$233.addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}
meridiem('a', true);
meridiem('A', false);
$mod$234.addUnitAlias('hour', 'h');
function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
}
$mod$235.addRegexToken('a', matchMeridiem);
$mod$235.addRegexToken('A', matchMeridiem);
$mod$235.addRegexToken('H', $mod$235.match1to2);
$mod$235.addRegexToken('h', $mod$235.match1to2);
$mod$235.addRegexToken('HH', $mod$235.match1to2, $mod$235.match2);
$mod$235.addRegexToken('hh', $mod$235.match1to2, $mod$235.match2);
$mod$235.addRegexToken('hmm', $mod$235.match3to4);
$mod$235.addRegexToken('hmmss', $mod$235.match5to6);
$mod$235.addRegexToken('Hmm', $mod$235.match3to4);
$mod$235.addRegexToken('Hmmss', $mod$235.match5to6);
$mod$236.addParseToken([
    'H',
    'HH'
], $mod$237.HOUR);
$mod$236.addParseToken([
    'a',
    'A'
], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
$mod$236.addParseToken([
    'h',
    'hh'
], function (input, array, config) {
    array[$mod$237.HOUR] = $mod$238.default(input);
    $mod$240.default(config).bigHour = true;
});
$mod$236.addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[$mod$237.HOUR] = $mod$238.default(input.substr(0, pos));
    array[$mod$237.MINUTE] = $mod$238.default(input.substr(pos));
    $mod$240.default(config).bigHour = true;
});
$mod$236.addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[$mod$237.HOUR] = $mod$238.default(input.substr(0, pos1));
    array[$mod$237.MINUTE] = $mod$238.default(input.substr(pos1, 2));
    array[$mod$237.SECOND] = $mod$238.default(input.substr(pos2));
    $mod$240.default(config).bigHour = true;
});
$mod$236.addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[$mod$237.HOUR] = $mod$238.default(input.substr(0, pos));
    array[$mod$237.MINUTE] = $mod$238.default(input.substr(pos));
});
$mod$236.addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[$mod$237.HOUR] = $mod$238.default(input.substr(0, pos1));
    array[$mod$237.MINUTE] = $mod$238.default(input.substr(pos1, 2));
    array[$mod$237.SECOND] = $mod$238.default(input.substr(pos2));
});
function localeIsPM(input) {
    return (input + '').toLowerCase().charAt(0) === 'p';
}
exports.localeIsPM = localeIsPM;
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
exports.defaultLocaleMeridiemParse = defaultLocaleMeridiemParse;
function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}
exports.localeMeridiem = localeMeridiem;
var getSetHour = $mod$232.makeGetSet('Hours', true);
exports.getSetHour = getSetHour;