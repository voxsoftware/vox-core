var $mod$71 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$72 = core.VW.Ecma2015.Utils.module(require('../utils/abs-floor'));
function get(units) {
    units = $mod$71.normalizeUnits(units);
    return this[units + 's']();
}
exports.get = get;
function makeGetter(name) {
    return function () {
        return this._data[name];
    };
}
var milliseconds = makeGetter('milliseconds');
exports.milliseconds = milliseconds;
var seconds = makeGetter('seconds');
exports.seconds = seconds;
var minutes = makeGetter('minutes');
exports.minutes = minutes;
var hours = makeGetter('hours');
exports.hours = hours;
var days = makeGetter('days');
exports.days = days;
var months = makeGetter('months');
exports.months = months;
var years = makeGetter('years');
exports.years = years;
function weeks() {
    return $mod$72.default(this.days() / 7);
}
exports.weeks = weeks;