var $mod$327 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$328 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$329 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$330 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$331 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$332 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$333 = core.VW.Ecma2015.Utils.module(require('./week-calendar-utils'));
$mod$327.addFormatToken('w', [
    'ww',
    2
], 'wo', 'week');
$mod$327.addFormatToken('W', [
    'WW',
    2
], 'Wo', 'isoWeek');
$mod$328.addUnitAlias('week', 'w');
$mod$328.addUnitAlias('isoWeek', 'W');
$mod$329.addRegexToken('w', $mod$329.match1to2);
$mod$329.addRegexToken('ww', $mod$329.match1to2, $mod$329.match2);
$mod$329.addRegexToken('W', $mod$329.match1to2);
$mod$329.addRegexToken('WW', $mod$329.match1to2, $mod$329.match2);
$mod$330.addWeekParseToken([
    'w',
    'ww',
    'W',
    'WW'
], function (input, week, config, token) {
    week[token.substr(0, 1)] = $mod$331.default(input);
});
function localeWeek(mom) {
    return $mod$333.weekOfYear(mom, this._week.dow, this._week.doy).week;
}
exports.localeWeek = localeWeek;
var defaultLocaleWeek = {
    dow: 0,
    doy: 6
};
exports.defaultLocaleWeek = defaultLocaleWeek;
function localeFirstDayOfWeek() {
    return this._week.dow;
}
exports.localeFirstDayOfWeek = localeFirstDayOfWeek;
function localeFirstDayOfYear() {
    return this._week.doy;
}
exports.localeFirstDayOfYear = localeFirstDayOfYear;
function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}
exports.getSetWeek = getSetWeek;
function getSetISOWeek(input) {
    var week = $mod$333.weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}
exports.getSetISOWeek = getSetISOWeek;