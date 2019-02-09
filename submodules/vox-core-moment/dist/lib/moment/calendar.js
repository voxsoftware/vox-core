var $mod$128 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$129 = core.VW.Ecma2015.Utils.module(require('../units/offset'));
var $mod$130 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
function calendar(time, formats) {
    var now = time || $mod$128.createLocal(), sod = $mod$129.cloneWithOffset(now, this).startOf('day'), diff = this.diff(sod, 'days', true), format = diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
    var output = formats && ($mod$130.default(formats[format]) ? formats[format]() : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, $mod$128.createLocal(now)));
}
exports.calendar = calendar;