var $mod$53 = core.VW.Ecma2015.Utils.module(require('./bubble'));
var $mod$54 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$55 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
function as(units) {
    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = $mod$54.normalizeUnits(units);
    if (units === 'month' || units === 'year') {
        days = this._days + milliseconds / 86400000;
        months = this._months + $mod$53.daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        days = this._days + Math.round($mod$53.monthsToDays(this._months));
        switch (units) {
        case 'week':
            return days / 7 + milliseconds / 604800000;
        case 'day':
            return days + milliseconds / 86400000;
        case 'hour':
            return days * 24 + milliseconds / 3600000;
        case 'minute':
            return days * 1440 + milliseconds / 60000;
        case 'second':
            return days * 86400 + milliseconds / 1000;
        case 'millisecond':
            return Math.floor(days * 86400000) + milliseconds;
        default:
            throw new Error('Unknown unit ' + units);
        }
    }
}
exports.as = as;
function valueOf$() {
    return this._milliseconds + this._days * 86400000 + this._months % 12 * 2592000000 + $mod$55.default(this._months / 12) * 31536000000;
}
exports.valueOf = valueOf$;
function makeAs(alias) {
    return function () {
        return this.as(alias);
    };
}
var asMilliseconds = makeAs('ms');
exports.asMilliseconds = asMilliseconds;
var asSeconds = makeAs('s');
exports.asSeconds = asSeconds;
var asMinutes = makeAs('m');
exports.asMinutes = asMinutes;
var asHours = makeAs('h');
exports.asHours = asHours;
var asDays = makeAs('d');
exports.asDays = asDays;
var asWeeks = makeAs('w');
exports.asWeeks = asWeeks;
var asMonths = makeAs('M');
exports.asMonths = asMonths;
var asYears = makeAs('y');
exports.asYears = asYears;