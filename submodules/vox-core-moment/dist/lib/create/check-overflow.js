var $mod$0 = core.VW.Ecma2015.Utils.module(require('../units/month'));
var $mod$1 = core.VW.Ecma2015.Utils.module(require('../units/constants'));
var $mod$2 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
exports.default = function checkOverflow(m) {
    var overflow;
    var a = m._a;
    if (a && $mod$2.default(m).overflow === -2) {
        overflow = a[$mod$1.MONTH] < 0 || a[$mod$1.MONTH] > 11 ? $mod$1.MONTH : a[$mod$1.DATE] < 1 || a[$mod$1.DATE] > $mod$0.daysInMonth(a[$mod$1.YEAR], a[$mod$1.MONTH]) ? $mod$1.DATE : a[$mod$1.HOUR] < 0 || a[$mod$1.HOUR] > 24 || a[$mod$1.HOUR] === 24 && (a[$mod$1.MINUTE] !== 0 || a[$mod$1.SECOND] !== 0 || a[$mod$1.MILLISECOND] !== 0) ? $mod$1.HOUR : a[$mod$1.MINUTE] < 0 || a[$mod$1.MINUTE] > 59 ? $mod$1.MINUTE : a[$mod$1.SECOND] < 0 || a[$mod$1.SECOND] > 59 ? $mod$1.SECOND : a[$mod$1.MILLISECOND] < 0 || a[$mod$1.MILLISECOND] > 999 ? $mod$1.MILLISECOND : -1;
        if ($mod$2.default(m)._overflowDayOfYear && (overflow < $mod$1.YEAR || overflow > $mod$1.DATE)) {
            overflow = $mod$1.DATE;
        }
        if ($mod$2.default(m)._overflowWeeks && overflow === -1) {
            overflow = $mod$1.WEEK;
        }
        if ($mod$2.default(m)._overflowWeekday && overflow === -1) {
            overflow = $mod$1.WEEKDAY;
        }
        $mod$2.default(m).overflow = overflow;
    }
    return m;
};