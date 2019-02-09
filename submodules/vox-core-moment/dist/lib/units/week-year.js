var $mod$318 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$319 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$320 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$321 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$322 = core.VW.Ecma2015.Utils.module(require('./week-calendar-utils'));
var $mod$323 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$324 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$325 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$326 = core.VW.Ecma2015.Utils.module(require('../create/date-from-array'));
$mod$318.addFormatToken(0, [
    'gg',
    2
], 0, function () {
    return this.weekYear() % 100;
});
$mod$318.addFormatToken(0, [
    'GG',
    2
], 0, function () {
    return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token, getter) {
    $mod$318.addFormatToken(0, [
        token,
        token.length
    ], 0, getter);
}
addWeekYearFormatToken('gggg', 'weekYear');
addWeekYearFormatToken('ggggg', 'weekYear');
addWeekYearFormatToken('GGGG', 'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');
$mod$319.addUnitAlias('weekYear', 'gg');
$mod$319.addUnitAlias('isoWeekYear', 'GG');
$mod$320.addRegexToken('G', $mod$320.matchSigned);
$mod$320.addRegexToken('g', $mod$320.matchSigned);
$mod$320.addRegexToken('GG', $mod$320.match1to2, $mod$320.match2);
$mod$320.addRegexToken('gg', $mod$320.match1to2, $mod$320.match2);
$mod$320.addRegexToken('GGGG', $mod$320.match1to4, $mod$320.match4);
$mod$320.addRegexToken('gggg', $mod$320.match1to4, $mod$320.match4);
$mod$320.addRegexToken('GGGGG', $mod$320.match1to6, $mod$320.match6);
$mod$320.addRegexToken('ggggg', $mod$320.match1to6, $mod$320.match6);
$mod$321.addWeekParseToken([
    'gggg',
    'ggggg',
    'GGGG',
    'GGGGG'
], function (input, week, config, token) {
    week[token.substr(0, 2)] = $mod$323.default(input);
});
$mod$321.addWeekParseToken([
    'gg',
    'GG'
], function (input, week, config, token) {
    week[token] = $mod$324.hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}
exports.getSetWeekYear = getSetWeekYear;
function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
}
exports.getSetISOWeekYear = getSetISOWeekYear;
function getISOWeeksInYear() {
    return $mod$322.weeksInYear(this.year(), 1, 4);
}
exports.getISOWeeksInYear = getISOWeeksInYear;
function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return $mod$322.weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
exports.getWeeksInYear = getWeeksInYear;
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return $mod$322.weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = $mod$322.weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = $mod$322.dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = $mod$326.createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}