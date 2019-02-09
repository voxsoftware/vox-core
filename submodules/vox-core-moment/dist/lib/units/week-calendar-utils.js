var $mod$315 = core.VW.Ecma2015.Utils.module(require('./year'));
var $mod$316 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$317 = core.VW.Ecma2015.Utils.module(require('../create/date-from-array'));
function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy, fwdlw = (7 + $mod$317.createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = $mod$315.daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > $mod$315.daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - $mod$315.daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }
    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}
exports.dayOfYearFromWeeks = dayOfYearFromWeeks;
function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }
    return {
        week: resWeek,
        year: resYear
    };
}
exports.weekOfYear = weekOfYear;
function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return ($mod$315.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
exports.weeksInYear = weeksInYear;