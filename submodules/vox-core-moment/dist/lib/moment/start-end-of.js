var $mod$196 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
function startOf(units) {
    units = $mod$196.normalizeUnits(units);
    switch (units) {
    case 'year':
        this.month(0);
    case 'quarter':
    case 'month':
        this.date(1);
    case 'week':
    case 'isoWeek':
    case 'day':
    case 'date':
        this.hours(0);
    case 'hour':
        this.minutes(0);
    case 'minute':
        this.seconds(0);
    case 'second':
        this.milliseconds(0);
    }
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }
    return this;
}
exports.startOf = startOf;
function endOf(units) {
    units = $mod$196.normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }
    if (units === 'date') {
        units = 'day';
    }
    return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
}
exports.endOf = endOf;