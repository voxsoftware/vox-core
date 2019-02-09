var $mod$90 = core.VW.Ecma2015.Utils.module(require('./locales'));
var $mod$91 = core.VW.Ecma2015.Utils.module(require('../create/utc'));
function get(format, index, field, setter) {
    var locale = $mod$90.getLocale();
    var utc = $mod$91.createUTC().set(setter, index);
    return locale[field](utc, format);
}
function listMonthsImpl(format, index, field) {
    if (typeof format === 'number') {
        index = format;
        format = undefined;
    }
    format = format || '';
    if (index != null) {
        return get(format, index, field, 'month');
    }
    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get(format, i, field, 'month');
    }
    return out;
}
function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }
        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }
        format = format || '';
    }
    var locale = $mod$90.getLocale(), shift = localeSorted ? locale._week.dow : 0;
    if (index != null) {
        return get(format, (index + shift) % 7, field, 'day');
    }
    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get(format, (i + shift) % 7, field, 'day');
    }
    return out;
}
function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
}
exports.listMonths = listMonths;
function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}
exports.listMonthsShort = listMonthsShort;
function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}
exports.listWeekdays = listWeekdays;
function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}
exports.listWeekdaysShort = listWeekdaysShort;
function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}
exports.listWeekdaysMin = listWeekdaysMin;