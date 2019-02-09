var $mod$56 = core.VW.Ecma2015.Utils.module(require('../utils/abs-floor'));
var $mod$57 = core.VW.Ecma2015.Utils.module(require('../utils/abs-ceil'));
var $mod$58 = core.VW.Ecma2015.Utils.module(require('../create/date-from-array'));
function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays;
    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
        milliseconds += $mod$57.default(monthsToDays(months) + days) * 86400000;
        days = 0;
        months = 0;
    }
    data.milliseconds = milliseconds % 1000;
    seconds = $mod$56.default(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = $mod$56.default(seconds / 60);
    data.minutes = minutes % 60;
    hours = $mod$56.default(minutes / 60);
    data.hours = hours % 24;
    days += $mod$56.default(hours / 24);
    monthsFromDays = $mod$56.default(daysToMonths(days));
    months += monthsFromDays;
    days -= $mod$57.default(monthsToDays(monthsFromDays));
    years = $mod$56.default(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
}
exports.bubble = bubble;
function daysToMonths(days) {
    return days * 4800 / 146097;
}
exports.daysToMonths = daysToMonths;
function monthsToDays(months) {
    return months * 146097 / 4800;
}
exports.monthsToDays = monthsToDays;