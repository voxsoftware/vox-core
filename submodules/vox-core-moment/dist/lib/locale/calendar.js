var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
};
exports.defaultCalendar = defaultCalendar;
var $mod$86 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
function calendar(key, mom, now) {
    var output = this._calendar[key];
    return $mod$86.default(output) ? output.call(mom, now) : output;
}
exports.calendar = calendar;