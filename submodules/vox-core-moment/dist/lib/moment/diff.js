var $mod$140 = core.VW.Ecma2015.Utils.module(require('../utils/abs-floor'));
var $mod$141 = core.VW.Ecma2015.Utils.module(require('../units/offset'));
var $mod$142 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
function diff(input, units, asFloat) {
    var that, zoneDelta, delta, output;
    if (!this.isValid()) {
        return NaN;
    }
    that = $mod$141.cloneWithOffset(input, this);
    if (!that.isValid()) {
        return NaN;
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 60000;
    units = $mod$142.normalizeUnits(units);
    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1000 : units === 'minute' ? delta / 60000 : units === 'hour' ? delta / 3600000 : units === 'day' ? (delta - zoneDelta) / 86400000 : units === 'week' ? (delta - zoneDelta) / 604800000 : delta;
    }
    return asFloat ? output : $mod$140.default(output);
}
exports.diff = diff;
function monthDiff(a, b) {
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, 'months'), anchor2, adjust;
    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        adjust = (b - anchor) / (anchor2 - anchor);
    }
    return -(wholeMonthDiff + adjust) || 0;
}